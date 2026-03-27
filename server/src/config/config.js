const config = {
  //
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '27017',
  dbName: process.env.DB_NAME,
  //
  port: process.env.SERVER_PORT || '8080',
  //
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXIPRES_IN || '7d',
  //
  openAiApiKey: process.env.OPENAI_API_KEY,
  //
  storageCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  storageApiKey: process.env.CLOUDINARY_API_KEY,
  storageApiSecret: process.env.CLOUDINARY_API_SECRET,
  storageFolder: process.env.CLOUDINARY_TARGET_FOLDER,
};

module.exports = config;
