import React from 'react'
import { SignIn } from '@clerk/nextjs'

function LoginPage() {
    return (
        <div>
            <SignIn fallbackRedirectUrl={'/main'} />
        </div>
    )
}

export default LoginPage
