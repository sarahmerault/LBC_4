import { createContext, useState, useEffect} from "react"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext()

//authentification base sur l'existance d'un token 
export const AuthProvider = ({children}) => {

  //ETATS DE L'USER
  const [user, setUser] = useState(null)

  // si un utilisateur se connecte 
  //l'etat true = en chargement et false fin de chargement 
  const [loading, setLoading] = useState(true)


  //VERIFIER LE TOKEN 
  useEffect(() => {
    //VERIFIER SI Y'A LE TOKEN 
    const token = localStorage.getItem("token")

    if (token) {
      try {
            //DECODER LE TOKEN 
        setUser(jwtDecode(token))

      } catch (error) {

        //ENLEVER LE TOKEN DU STORAGE  SI IL EST EXPIRER 
        localStorage.removeItem('token')
        console.error(error)
      }
    }
    //TERMINER LE CHARGEMENT 
    setLoading(false)

  }, []);

  // UTILISATEUR DECONNECTER 
  const logout = ()=>{
    //UTILISATEUR DECONECTER+TOKEN ENLEVER
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    //CONTEXT D'AUTENTIFICATION 
    <AuthContext.Provider
    //PROPS ? 
      value={{ user, setUser, logout, loading }}>
        {children}
    </AuthContext.Provider>
  )

}