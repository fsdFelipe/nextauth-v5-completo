import NextAuth from "next-auth"

//imports após criar middleware
import authConfig from "./auth.config"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "./lib/db"

export const { 
    handlers : {GET, POST}, 
    auth,
    signIn,
    signOut
 } = NextAuth({ 
       // providers: [ GitHub ] cod antes de criar middelware
       //cod após criar middleware
       adapter: PrismaAdapter(db),
       session: { strategy: "jwt"},
       ...authConfig,
     })