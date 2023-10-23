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