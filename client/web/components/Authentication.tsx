import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import Background from './Background';

// TODO: keycloak
const authenticated = true

interface AuthenticationProps {
    isProtected: boolean;
}

const Authentication = ({ isProtected, children } : PropsWithChildren<AuthenticationProps>) => {
    const router = useRouter();

    if (isProtected && !authenticated) {
        router.push('/login');
        return (<Background/>)
    } else {
        return (children)
    }
}

export default Authentication
