require('express-async-errors');
require('./connections/database');
require('./connections/cronJobs');
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const notFoundMiddleware = require('./middlewares/not-found');
const authenticateUser = require('./middlewares/authentication');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');
const senderIdRoutes = require('./routes/senderId');
const contactGroupRoutes = require('./routes/contactGroup');

// Middleware
app.use(bodyParser.json());

app.use(cors())

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});


// Use API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/contacts', authenticateUser, contactRoutes);
app.use('/api/v1/contactGroups', authenticateUser, contactGroupRoutes);
app.use('/api/v1/senderIds', authenticateUser, senderIdRoutes);
app.use('/api/v1/messages', authenticateUser, messageRoutes);


// Custom Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
