import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';

import Background from './Background';

interface AuthenticationProps {
    isProtected: boolean;
}

const Authentication = ({ isProtected, children } : PropsWithChildren<AuthenticationProps>) => {
    // TODO: set true for testing purposes
    const [authenticated, setAuthenticated] = useState(true)
    const router = useRouter();

    console.log("isProtected: ", isProtected)
    console.log("authenticated: ", authenticated)

    useEffect(() => {
        const keycloak = new Keycloak({
            url: "http://localhost:8080/auth",
            realm: "myrealm",
            clientId: "myclient"
        })
        console.log("keycloak: ", keycloak)

        const checkAuthentication = async () => {
            try {
                const authenticated = await keycloak.init({ onLoad: 'login-required' });
                setAuthenticated(authenticated);
                if (!authenticated) {
                    router.push('/login')
                }
            } catch (error) {
                console.log("Error authenticating: ", error)
            }
        }

        if (isProtected) {
            checkAuthentication()
        }
    }, [authenticated, isProtected, router])

    if (isProtected && !authenticated) {
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

    // if (isProtected && !authenticated) {
    //     router.push('/login');
    //     return (<Background/>)
    // } else {
    //     return (children)
    // }
}

export default Authentication
