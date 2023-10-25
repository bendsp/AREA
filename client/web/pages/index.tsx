import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import isNewUser from '../methods/auth/isNewUser';
import addNewUser from '../methods/auth/addNewUser';
import Background from '../components/wrappers/Background';

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

  return (
    <Background>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl mb-4 text-white font-bold">Welcome to Area</h1>
        <div className="flex flex-col p-5">
          <div className="flex-grow">
            <Link href="/api/auth/login">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Background>
  )
}
