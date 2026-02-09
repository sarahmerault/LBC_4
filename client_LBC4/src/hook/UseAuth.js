import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"


//UTILISER LE AUTHCONTEXT ET LE VERIFIER
export const useAuth = ()=>{
   return (useContext(AuthContext))
}


