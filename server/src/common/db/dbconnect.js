const mongoose = require('mongoose');
const config = require('../../config/config');

const addDefaultDocuments = require('./addDefaultDocuments');

const {
  dbUser,
  dbPassword,
  dbHost,
  dbPort,
  dbName,
} = config;

const connectionOptions = 'authMechanism=DEFAULT&authSource=admin';
const connectionString = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?${connectionOptions}`;

const dbconnect = async () => {
  try {
    await mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.info('connected to db');
  } catch (error) {
    console.error('db connection error:', error);
  }

  try {
    await addDefaultDocuments();
    console.info('Default documents synced with database');
  } catch (error) {
    console.error('Failed syncing default documents');
  }
};

module.exports = dbconnect;
