require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { pool, initDatabase } = require('./db');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

initDatabase();
app.use((req, res, next) => {
  res.removeHeader('Content-Security-Policy');
  next();
});
app.use(cors());
app.use(express.json());

//путь к frontend
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Регистрация
app.post('/auth/signup', async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  try {
    const existing = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const result = await pool.query(
      'INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, username',
      [username, password, firstName || '', lastName || '']
    );
    res.json({ id: result.rows[0].id, username: result.rows[0].username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Логин
app.post('/auth/signin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT id, username, first_name, last_name, avatar FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    res.json({
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      avatar: user.avatar,
      token: 'dummy-token'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Получить пользователя
app.get('/auth/user', async (req, res) => {
  const token = req.headers.authorization;
  // Для простоты возвращаем тестового пользователя
  res.json({ id: 1, username: 'test' });
});

// Получить чаты
app.get('/api/chats', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, array_agg(DISTINCT jsonb_build_object('id', u.id, 'username', u.username, 'avatar', u.avatar)) as users
       FROM chats c
       LEFT JOIN chat_participants cp ON c.id = cp.chat_id
       LEFT JOIN users u ON cp.user_id = u.id
       GROUP BY c.id
       ORDER BY c.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Создать чат
app.post('/api/chats', async (req, res) => {
  const { name, type = 'normal' } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO chats (name, type) VALUES ($1, $2) RETURNING *',
      [name || null, type]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Получить сообщения чата
app.get('/api/messages/:chatId', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT m.*, u.username, u.avatar
       FROM messages m
       JOIN users u ON m.user_id = u.id
       WHERE m.chat_id = $1
       ORDER BY m.created_at ASC
       LIMIT 100`,
      [req.params.chatId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Отправить сообщение
app.post('/api/messages', async (req, res) => {
  const { chatId, userId, content, contentType = 'text' } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO messages (chat_id, user_id, content, content_type) VALUES ($1, $2, $3, $4) RETURNING *',
      [chatId, userId, content, contentType]
    );
    const message = result.rows[0];
    const userResult = await pool.query('SELECT username, avatar FROM users WHERE id = $1', [userId]);
    const messageWithUser = { ...message, username: userResult.rows[0].username, avatar: userResult.rows[0].avatar };
    io.to(`chat_${chatId}`).emit('new_message', messageWithUser);
    res.json(messageWithUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// WebSocket
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  socket.on('auth', (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.userId = userId;
    io.emit('online_users', Array.from(onlineUsers.keys()));
  });

  socket.on('join_chat', (chatId) => {
    socket.join(`chat_${chatId}`);
  });

  socket.on('message', (data) => {
    socket.to(`chat_${data.chatId}`).emit('message', data);
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
      io.emit('online_users', Array.from(onlineUsers.keys()));
    }
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
