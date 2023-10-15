// pages/index.js
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Index() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    /* 
    vérifier si
    l'utilisateur est déjà dans la base de données ou pas
    avec la route http://localhost:8080/client/user/:user.sub
    et sinon envoyer les infos de l'utilisateur
    dans la base de données à l'aide de la route
    http://localhost:8080/client/new-user avec la méthode POST
    {
      "email": user.email,
      "username": user.nickname,
      "user_id": user.sub,
      "nb_area": 0
    }
    */
    
    console.log(user);
    router.push('/home');
  }

  return <Link href="/api/auth/login">Login</Link>;
}