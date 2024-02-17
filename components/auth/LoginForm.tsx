import React from 'react'
import CardWrapper from './CardWrapper'

const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel='Bem Vindo'
            backButtonLabel='Ainda não tem uma conta ?'
            backButtonHref='/auth/register'
            showSocial
        >
            Login Form
        </CardWrapper>
    )
}

export default LoginForm