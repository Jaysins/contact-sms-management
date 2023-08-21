const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URI, {
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connections error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
