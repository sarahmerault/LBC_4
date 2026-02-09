
import{useForm} from "react-hook-form"

//PROPS
const Form = ({inputs, onSubmit,submitLabel}) => {

    //STRUCTURE DE react-hook-form  POUR UN FORM
     const {register,handleSubmit,formState:{errors}} = useForm()


  return (
    //CRÉE LE COMPOSANT DU FORM 
    //TABLEAUX D'INPUTS
    //KEY  S'AUTOINCREMENT POUR CONNAITRE LES ERREUR S
    <form  onSubmit={handleSubmit(onSubmit)}>
       { inputs.map((input)=>(
        <div key={input.name}>
            <label>{input.label}</label>
            <input type={input.type} {...register(input.name,input.validation)}/>
            
            {errors[input.name]&&(<p>{errors[input.name].message}</p>
        )}


        </div>
       ))}

<button type ="submit">{submitLabel}</button>
    </form>
   
  )
}

export default Form