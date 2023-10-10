import { useRouter }  from 'next/router';
import { useState, useEffect } from 'react';

// Components
import HomeHeader from '../components/home/HomeHeader';
import ActionsContainer from '../components/home/actionsContainer/ActionsContainer';
import ServicesContainer from '../components/home/servicesContainer/ServicesContainer';

// Interfaces
import { ProtectedPage } from '../interfaces/protectedPage';
import Background from '../components/wrappers/Background';

// Methods
import fetchAboutJson from '../methods/fetchAboutJson';

export function getStaticProps(): ProtectedPage {
  return {
    props: {
      isProtected: true
    }
  }
}

const HomePage: React.FC = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchAboutJson({ setServices });
  }, [])

  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/login');
  }

  return (
    <Background className="flex flex-col p-5 space-y-5">
      <HomeHeader />
      <ActionsContainer services={services}/>
      <ServicesContainer services={services} />
      <div className="flex-grow">
        <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-300 font-bold rounded-xl p-3">Go to Login</button>
      </div>
    </Background>
  );
};

export default HomePage;
