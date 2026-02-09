import { db } from '../config/db.js';


//CMD SQL CREATION NOUVEL UTILISATEUR 
export const createUser_model = async ( email, passwordHash,verify_token,role ="USER" ) => {

   // Insertion sécurisée via placeholders
   const [result] = await db.query('INSERT INTO users (email, password_hash,verify_token,role) VALUES (?, ?, ?,? )',[email, passwordHash,verify_token,role] );

   //statu code 201 de mysql deja automatisé avec l'id de la personne 
   return result.insertId;
    
};


// CMD SQL TROUVER L'USER PAR L'EMAIL 
export const findUserByEmail_model = async (email) =>{
    const [rows] =await db.query ('SELECT * FROM users WHERE email = ?',[email])
   return rows[0]
}

//CMD SQL TROUVER L'USER PAR SONT (verify_token)
export const findUserByVerifyToken_model = async (token)=>{
    const [rows] = await db.query ('SELECT * FROM users WHERE verify_token =?',[token])
    return rows [0]
}
 
 //CMD SQL CHANGER L'USER(ID) EN  PASSANT VERIFIER (1) PUIS METTRE LE TOKEN EN NULL
 export const verifyUser_model =async (userId)=>{
    await db.query('UPDATE users SET is_verified=1 , verify_token=NULL WHERE id= ?',[userId,])
}

 // CMD SQL TROUVER L'USER AVEC LE reset token 
  export const findUserByResetToken_model =async (token)=>{
    const [rows]= await  db.query ('SELECT * FROM users WHERE reset_token = ?',[token])
 }

 //CMD SQL CHANGER LE PASSWORD 
 export const updatePassword_model = async (userId,passwordHash) =>{
    await db.query('UPDATE users SET password_hash=?,WHERE id=?',[passwordHash,userId])
 }

 //CMD SQL RECUPERER UN reset_token POUR UN USER (ID)
 export const saveResetPassword_model = async (userId,token) =>{
    await db.query('UPDATE users SET reset_token =? WHERE id =?',[userId,token])
 }

 //CMD SQL CHANGER L'USER(ID) METTRE LE reset_token EN NULL
export const verifyResetToken_model = async (userId) => {
    await db.query('UPDATE users SET reset_token = NULL WHERE id = ?', [userId]);
};

 