import mysql from 'mysql2/promise';
import 'dotenv/config';

let db;


//CONNECTION A LA DB 
try {
  
    db = mysql.createPool({
        host: process.env.DB_HOST,     // Adresse du serveur MySQL
        user: process.env.DB_USER,     // Utilisateur MySQL
        password: process.env.DB_PASSWORD, // Mot de passe MySQL
        database: process.env.DB_NAME  // Nom de la base de données
    });

    // VERIF DE LA CONNECTION A LA DB 
  await db.getConnection();
  console.log(
    `connexion a la base de données ${process.env.DB_HOST} est réussie`,
  );
} catch (error) {
  console.error(
    `Erreur lors de la connexon a la base de donnée `,
    error.message,
  );
  process.exit(1);
}

//EXPORT DB EN OBJECT
export { db };
