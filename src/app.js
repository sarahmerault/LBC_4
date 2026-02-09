// Import du framework Express pour créer le serveur HTTP
import express from 'express';
// Import des routes métier de l'application
import authRoutes from './routes/auth.routes.js';
import 'dotenv/config'
import { authorize_middleware,authMiddleware} from './middlewares/auth.middleware.js';
// Création de l'instance Express (application principale)
import cors from "cors"


const app = express();

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173'
}))

//ROUTES PRINCIPALES
app.use('/api/auth',authRoutes)

//AUTHORISATION ROLES POUR LES ROUTES 
app.get('/admin',authMiddleware,authorize_middleware(['ADMIN','MODERATOR']),(req,res)=> res.send('mon api fonctionne bien '))

 export default app