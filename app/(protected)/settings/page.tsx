import React from 'react'
import { auth, signOut } from '@/auth'

const page = async () => {
    const session = await auth()

    return (
        <div>
            Settings Page ! de
            {JSON.stringify(session)}
            <form action={async () => {
                'use server'
                await signOut()
            }}>
                <button type='submit'>
                    Logout
                </button>
            </form>
        </div>
    )
}

export default page