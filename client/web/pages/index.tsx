import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import isNewUser from '../methods/auth/isNewUser';
import addNewUser from '../methods/auth/addNewUser';

export default function Index() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const handleUserData = async () => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    if (user) {
      /*
      vérifier si
      l'utilisateur est déjà dans la base de données ou pas
      avec la route http://localhost:8080/client/user/:user.sub
      si le user_id renvoyé est "0" alors l'utilisateur n'est pas dans la base de données
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

      const subId = user.sub as string;

      const isNew = await isNewUser(subId);

      if (!isNew) {
        addNewUser(user);
      }

      localStorage.setItem('user', JSON.stringify(user));

      router.push('/home');
    }
  }

  handleUserData();

  return <Link href="/api/auth/login">Login</Link>;
}