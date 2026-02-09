import app from './app.js';
import "dotenv/config"

const PORT = process.env.PORT || 5000;

//ATTRIBUER UN PORT 
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} `);
});
