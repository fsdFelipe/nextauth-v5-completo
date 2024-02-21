'use server'

import { signIn } from "@/auth"
import { getAccountByUserId } from "@/data/accounts"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import * as z  from "zod"

export const login = async (values : z.infer<typeof LoginSchema>) =>{
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success){
        return { error: "Invalid fields"}
    }
    
    const {email, password} = validatedFields.data;

    const userExist = await getUserByEmail(email);

    if(userExist && userExist.email && !userExist.password){
        const provider = await getAccountByUserId(userExist.id)
        return { error: `Senha não cadastrada logue com ${provider?.provider}`}
    }

    if(!userExist || !userExist.email || !userExist.password){
        return { error: "Email não cadastrado"}
    }

    if(userExist.email && !userExist.emailVerified){
        const vericationToken = await generateVerificationToken(userExist.email);
        //send verification token email
        await sendVerificationEmail(vericationToken.email, vericationToken.token)
        return { error: 'Email não verificado ! verifique seu email'}
    }

    if(!userExist.emailVerified){
        const vericationToken = await generateVerificationToken(userExist.email);

        //send verification token email
        await sendVerificationEmail(vericationToken.email, vericationToken.token)

        return {success: "Email de confirmação enviado"}
    }

    try {
       await signIn('credentials', {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
       }) 
    } catch (error) {
        if ( error instanceof AuthError){
            switch (error.type){
                case 'CredentialsSignin': 
                return { error: 'Credenciais invalidas!'};
                default:
                    return { error: 'Ops algo deu errado!'};
            }
        }
        throw error
    }
}