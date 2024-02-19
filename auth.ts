import NextAuth from "next-auth"

//imports após criar middleware
import authConfig from "./auth.config"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"

export const { 
    handlers : {GET, POST}, 
    auth,
    signIn,
    signOut
 } = NextAuth({ 
       // providers: [ GitHub ] cod antes de criar middelware
       //cod após criar middleware
       callbacks: {
        async signIn({user}) {
            const userExist = await getUserById(user.id as string);

            if(!userExist || !userExist.emailVerified){
              return false
            }

            return true
        },

        async session({ token, session}) {

          if(token.sub){
            session.user.id = token.sub
          }

          if(token.role && session.user){
            session.user.role = token.role as UserRole
          }

            return session
        },
        async jwt( {token}) {
          if(!token.sub) return token;
          
          const userExist = await getUserById(token.sub);

          if (!userExist) return token;

          token.role = userExist.role

           return token 
        },
       },
       adapter: PrismaAdapter(db),
       session: { strategy: "jwt"},
       ...authConfig,
     })