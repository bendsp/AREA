import React from 'react';
import { useRouter }  from 'next/router';

// Components
import HomeHeader from '../components/HomeHeader';
import ActionsContainer from '../components/ActionsContainer';
import ServicesContainer from '../components/ServicesContainer';

// Interfaces
import { ProtectedPage } from '../interfaces/protectedPage';
import Background from '../components/Background';

export function getStaticProps(): ProtectedPage {
  return {
    props: {
      isProtected: true
    }
  }
}

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/login');
  }

  return (
    <Background className="flex flex-col p-5 space-y-5">
      <HomeHeader />
      <ActionsContainer />
      <ServicesContainer />
      <div className="flex-grow">
        <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-300 font-bold rounded-xl p-3">Go to Login</button>
      </div>
    </Background>
  );
};

export default HomePage;
