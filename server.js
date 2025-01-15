// server.js: Entry point for the application
const express = require('express');
const app = express();
const routes = require('./routes');
const { sequelize } = require('./models');
const authMiddleware = require('./middleware/auth');

app.use(express.json());
app.use(authMiddleware);
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Failed to sync database:', err));
