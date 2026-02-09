import React from 'react'

import api from '../../api/axios'
import Form from '../../components/Form'

const RegisterPages = () => {

        //CORELATION AVEC LA DB 
    const fields =[
       
        {
            name: "email",
            label: "email",
            type: "email",
            validation: { required: "requis" }
            
        },

        {
            name: "password",
            label: "password",
            type: "password",
            validation: { required: "requis" }
            

        },
        {
            name: "confirmPassword",
            label: "confirmPassword",
            type: "confirmPassword",
            validation: { required: "Confirmation du mot de pass requis" }
            
        }

    ]


    
    //FONCTION POUR ENREGISTRER LES DATA  ON SUBMITE 
    const onSubmit = async (data)=>{

            //GERER LES ERREUR 
        try {
            await api.post('/auth/register',data)
            alert('votre compte a ete crée ')
            
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.message)
            
        }
    }
  return (
    <Form inputs={fields} onSubmit={onSubmit} submitLabel={`s'inscrire`}/>
    
  )
}

export default RegisterPages