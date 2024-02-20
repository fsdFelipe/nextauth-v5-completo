'use server'
import { RegisterSchema } from "@/schemas"
import * as z  from "zod"
import bcrypt from 'bcrypt'
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async (values : z.infer<typeof RegisterSchema>) =>{
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success){
        return { error: "Invalid fields"}
    }

    const { email, password, name } = validatedFields.data;
    const hasedPassword = await bcrypt.hash(password, 10)

    //verificar se email ja foi cadastrado cod inicial
  /**   const userExists = await db.user.findUnique({
        where:{
            email,
        }
    })*/

    //verificar se email ja foi cadastrado apos criado arquivo user.ts
    const userExists = await getUserByEmail(email)

    //se email ja foi cadastrado exibir:
    if(userExists) {
        return { error: "Email ja cadastrado"}
    }

    //se o email não existe no bd então criar novo user
    await db.user.create({
        data:{
            name,
            email,
            password: hasedPassword,
        }
    })

    const verificationToken = await generateVerificationToken(email)

    //send verification token email
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: 'Email de confirmação enviado'}
}