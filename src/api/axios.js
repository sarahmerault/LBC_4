import axios from 'axios';



//CONNECTION AU BACKEND
const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials: false

} 
)

//INTERCEPTER LES REQUESTCONFIG DU BACKEND
api.interceptors.request.use((config) => {

    
    //STOCKER LE TOKEN 
    const token = localStorage.getItem('token');

    //si y'a lE token special de bearer donner les autorisation
    if (token) {
       config.headers.Authorization = `Bearer ${token}` 
    }
return config

})

export default api