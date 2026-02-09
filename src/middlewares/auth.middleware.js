import jwt from 'jsonwebtoken';
import 'dotenv/config';


//SÉCURITÉ POUR VERIFIER SI Y'A DES TOKEN 
 export const authMiddleware = (req,res,next) => {

   // ETATS DE L'USER SI CONNECTER OU PAS FRONT 
    const authHeader = req.headers.authorizaion;

    //si pas connecter 
    if (!authHeader) {
        return res.status(401).json({message:`token manquant`})}

      //RECUPRER LA PARTIE DU TOKEN  QUI CONTIRN LES INFO USER (payload)
        const  token = authHeader.split ('')[1]

      try {
         //VERIFIER LE TOKEN SECRET
         req.user=jwt.verify(token,process.env.JWT_SECRET)
            
            next();
      } catch (error) {
           return res.status(403).json({message:"token invalide"})
            
      }
 }


 //roles et autorisation
 export const authorize_middleware = (roles=['ADMIN','MODERATOR']) =>(req,res,next)=>{
    if (!roles.includes(req.user.role)) 
         return res.status(403).json({message:"acccès interdit"})
        next ();
        
    

 }