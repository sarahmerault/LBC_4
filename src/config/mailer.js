// se connecter a brevo pour les email
import nodemailer from "nodemailer"
import "dotenv/config"



//TRANSPORT DE L'EMAIL AVEC BREVO
export const transporter = nodemailer.createTransport({
    host:process.env.BREVO_SMTP_HOST,
    port:Number(process.env.BREVO_SMTP_PORT),
    secure:false,
    auth:{
        user:process.env.BREVO_SMTP_USER,
        pass:process.env.BREVO_SMTP_PASS

    }
})

//VERIFIER LE TRANSPORT
transporter.verify((err, success) => {
  if (err) console.error("Erreur SMTP ", err.message)
    else console.log('SMTP connecter')
 
})


//ENVOIE MAIL VERIFICATION EMAIL ---->EMAIL USER(token dans l'url)
export const sendVerificationMail_config= async (email,token)=>{
     await transporter.sendMail({
        from:'Autentification API <sarah.merault@gmail.com>',
        to:email,
        subject:'Confirmation',
        html:`<h2> Bienvenu ${email}</h2>
        <p>Merci pour votre inscription veuiller cliquer sur le lien ci-dessous  pour verifier votre email</p>
        <a href ="http://localhost:3000/api/auth/verify?token=${token}">Verifier mon email</a>`
     })

}

// ENVOIE MAIL DE REINITIALISATION ---->EMAIL(token dans l'url)
export const sendResetPasswordEmail_config= async (email,token)=>{
     await transporter.sendMail({
        from:'Autentification API <sarah.merault@gmail.com>',
        to:email,
        subject:'reinitialisation',
        html:`<h2> Bienvenu ${email}</h2>
        <p>veuiller cliquer sur le lien ci-dessous  pour reinitialiser votre mots de passe</p>
        <a href ="http://localhost:3000/api/auth/reset-password-request?token=${token}">reinitialiser votre mots de passe </a>`
     })

}


//