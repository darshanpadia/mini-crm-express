require('dotenv').config(); // Load .env variables

const app = require('./app');
const PORT = process.env.PORT; // grab PORT from .env

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});