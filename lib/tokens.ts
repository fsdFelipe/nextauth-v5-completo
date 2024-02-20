import { getVerificationTokenByEmail } from '@/data/verificationToken';
import {v4 as uuidv4} from 'uuid'
import { db } from './db';

export const generateVerificationToken = async (email: string) =>{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // token expira em uma hora

    const tokenExist = await getVerificationTokenByEmail(email);

    if(tokenExist) {
        await db.verificationToken.delete({
            where:{
                id: tokenExist.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    })

    return verificationToken;
}

