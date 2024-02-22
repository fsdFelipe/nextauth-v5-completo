'use client'
import React from 'react'
import { logout } from '@/actions/logout'
import { useCurrentUser } from '@/hooks/use-current-user'

const SettingsPage = () => {
    const user = useCurrentUser();

    const onClick = () => {
        logout();
    }

    return (
        <div>
            Settings Page ! de
            {JSON.stringify(user)}
            <button onClick={onClick}>
                Logout
            </button>
        </div>
    )
}

export default SettingsPage