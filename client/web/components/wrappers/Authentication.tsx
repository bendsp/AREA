import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { User } from '../../interfaces/user';

import Background from './Background';

interface AuthenticationProps {
    isProtected: boolean;
}

const Authentication = ({ isProtected, children } : PropsWithChildren<AuthenticationProps>) => {
    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter();

    console.log("isProtected: ", isProtected)
    console.log("authenticated: ", authenticated)

    useEffect(() => {
        const checkAuthentication = async () => {
            const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) as User: null;
            if (user !== null)
                setAuthenticated(true)
        }

        if (isProtected) {
            checkAuthentication()
        }
    }, [authenticated, isProtected, router])

    if (isProtected && !authenticated) {
        router.push('/')
        return (
        <Background>
            <div className="flex flex-col p-5">
                <div className="flex-grow">
                    <p className="text-white">Loading...</p>
                </div>
            </div>
        </Background>
        )
    }

    return (children)
}

export default Authentication
