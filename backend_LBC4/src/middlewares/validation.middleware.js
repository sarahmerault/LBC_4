import { z } from "zod";


//VALIDATION REGISTER
//    "email":"xavif83114@cimario.com",
  //  "password":"azerty123456",
 //   "confirmPassword": "azerty123456"


 //SÉCURITÉ REGISTER
export const validateRegister_middleware = (req, res, next) => {

  // SCHEMA VALIDATION REGISTER
  const schema = z.object({
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  });

  try {

    //VERIFIER LE SCHEMA REGISTER 
    schema.parse(req.body);

    //SI LES PASSWORD/PASSWORDCONFIRM CORRESPONDE PAS 
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ message: `Les mots de passe ne correspondent pas ` });
    }

    next();
  } catch (e) {
    return res
      .status(400)
      .json({ message: e.issues.map((err) => err.message).join(",") });
  }
};



//VALIDATION LOGIN
export const validateLogin_middleware = (req, res, next) => {
  //SCHEMA VALIDATION LOGIN
  const schema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  try {
    //VERIFIER LE SCHEMA LOGIN
    schema.parse(req.body);

    next();
  } catch (e) {
    return res
      .status(400)
      .json({ message: e.issues.map((err) => err.message).join(",") });
  }
};


//VALIDATION RESET