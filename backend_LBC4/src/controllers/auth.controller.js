import argon2 from 'argon2';
import 'dotenv/config'
import jwt from 'jsonwebtoken';
import {v4 as uuid4} from 'uuid'
import {db} from '../config/db.js'
import { createUser_model, findUserByEmail_model, saveResetPassword_model, updatePassword_model, verifyUser_model,findUserByVerifyToken_model,verifyResetToken_model } from '../models/user.model.js';
import { sendVerificationMail_config,sendResetPasswordEmail_config } from '../config/mailer.js';



//REGISTER CONTROLLER
export const register_controller = async(req,res) => {
    try {
        //1-RECUPÈRE LES INFO DANS LE FRONT END
        const  {email,password}= req.body;

        //2-VERIF DE L'USER PAR EMAIL
        const existing = await findUserByEmail_model(email)

        //si l'email existe deja 
        if (existing)  {return res.status(400).json({message:"email deja utiliser "})}

        //3-HASH LE PASSWORD
        const passwordHash = await argon2.hash(password)

        //4-CRÉATION DU TOKEN 
        const verify_token = uuid4()

        //5- ENVOYER  LES OBJECT  A LA DB VIA LE MODEL  SQL
        await createUser_model(email,passwordHash,verify_token)

        //6-ENVOYER L'EMAIL DE VERIF  VIA LA CONFIG 
        await sendVerificationMail_config (email,verify_token)

        //7- MESSAGE COMPTE CRÉE 
             return res.status(201).json({message:"compte crée avec succée, verifier votre email"})
        
            } catch (error) {
        res.status(500).json({message:"erreur serveur",error:error.message})
    }
}

 //LOGIN CONTROLLER
  export const login_controller = async (req,res)=>{
    
try {
    //1-RECUPRER DANS LE FRONT-END 
    const {email,password}= req.body

    //2-VERIF DE L'USER PAR L'EMAIL VIS A LE MODEL  SQL
    const user = await findUserByEmail_model(email)
    //verifier si le nom d'utilisateur est bon 
    if (!user) {return res.status(400).json({message:"email ou mdp invalide"})}

    //3-VERIFIER SI LE COMPTE EST VERIFIER 
    if (!user.is_verified) { return res.status(403).json({message:"compte non verifier"})}

    //4-VERIFIER LE MDP HASHER AVEC ARGON2
    const valid = await argon2.verify(user.password_hash,password)
    
    // si le compte est pas valide (message erreur)
    if(!valid) {return res.status(400).json({message :"email ou mots de passe incorrect "})}

    //5- INJECTER LES INFO DE L'USER DANS LE TOKEN  
    const token = jwt.sign({
        id: user.id, email:user.email, role:user.role}
        ,process.env.JWT_SECRET,
        //date d'expiration du token
        {expiresIn:unstable_routeRSCServerRequest.env.JWT_EXPIRES_AT})
    
    //-6 RENVOYER LE TOKEN  EN REPONCE
     res.status(200).json({token})
} catch (error) {
    res.status(500).json({message:"aucun utilisateur ou email"})   
}
}

//VERIFY EMAIL
export const verifyEmail_controller = async (req,res,next)=>{

    try {
        //1-RECUPÈRER LE TOKEN DANS LA DB 
        const {token} = req.query

        //2-VERIF DE L'USER PAR SONT (verify_token)
        const user = await findUserByVerifyToken_model(token)
        //si y'a pas d'user qui correspond au token 
        if (!user) { return res.status(400).json({message:"token invalide"})}

        //3-CHANGER L'ETATS DE L'USER VIS A LE MODEL  SQL (CTRL+)
        await verifyUser_model(user.id)

        //4-MESSAGE DE COMPTE VERIFIER
        res.status(200).json({message:"votre compte a bien ete verifié "})
        
    } catch (error) {
        res.status(500).json({message:"erreur survenue",error:error.message})
    }
}


//REQUEST MAIL PASSWORD RESET
    export const resetPasswordRequest_controller = async (req,res)=>{

try{ 
    //1- RECUPRER DANS LE FRONT
    const {email} = req.body

    //2-VERIF DE L'USER PAR L'EMAIL VIS A LE MODEL SQL
    const user = await findUserByEmail_model(email)
    // si l'email existe pas 
    if (!user) {return res.status(400).json({message:"email non trouvé "})}

    //3-CRÉE LE reset_token
    const resetToken = uuid4()

    //4-RECUPRER L'USER ET LUI INJECTER LE(reset_token) VIS A MODEL
    await saveResetPassword_model(user.id,resetToken)

    //ENVOYER UN MAIL DE RESTE PASSWORD VIS A LA CONFIG 
    await sendResetPasswordEmail_config(email,resetToken)

    }
catch (error) {
     res.status(500).json({message:"erreur serveur", error:error.message})
} 
  }


// RESET PASSWORD
   export const resetPassword_controller = async (req,res)=>{

     try{ 

    //1- RECUPRER DANS LE FRONT
    const {password}= req.body

    //2-VERIF DE L'USER
    const user = await findUserByEmail_model(email)
    // si l'email(user) existe pas 
    if (!user) {return res.status(400).json({message:"email non trouvé "})}

    //3-HASHER LE NOUVEAUX PASSWORD
    const  passwordHash= await argon2.hash(password)

    //4-CHANGER LE PASSWORD VIS A LE MODEL SQL
    await updatePassword_model (user.id,passwordHash)

    //5-CHANGER L'ETATS DE L'USER VIS A LE MODEL SQL (CTRL+)
    await verifyResetToken_model(user.id)

    //6-MESSAGE DE PASSWORD REINITIALISER
    res.status(200).json({message:"mots de passe reinitialiser avec cool"})
    }
catch (error) {
     res.status(500).json({message:"erreur serveur", error:error.message})
}
    
   }


 