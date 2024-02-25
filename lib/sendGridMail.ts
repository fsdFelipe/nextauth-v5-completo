import sgMail from '@sendgrid/mail'


sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
const domain = process.env.NEXT_PUBLIC_APP_URL;


export const sendVerificationEmailsendGrid = async (email: string, token: string) =>{
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    const msg = {
    to: email, // Change to your recipient
    from: 'xksilent07@gmail.com', // Change to your verified sender
    subject: 'Confirmar email',
    html: `<p>Click <a href='${confirmLink}'>aqui</a> para comfirmar o email</p>`
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

export const sendPasswordResetEmailsendGrid = async (email: string, token: string) =>{
    const resetLink =  `${domain}/auth/new-password?token=${token}`

    const msg = {
    to: email, // Change to your recipient
    from: 'xksilent07@gmail.com', // Change to your verified sender
    subject: 'Confirmar email',
    html: `<p>Click <a href='${resetLink}'>aqui</a> para alterar sua senha </p>`
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

export const sendTwoFactorTokenEmailsendGrid = async (email: string, token: string) =>{
     const msg = {
    to: email, // Change to your recipient
    from: 'xksilent07@gmail.com', // Change to your verified sender
    subject: 'Confirmar email',
    html: `<p>Your 2FA code: ${token}</p>`
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}