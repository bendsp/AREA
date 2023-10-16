import { useRouter }  from 'next/router';
import { useState, useEffect } from 'react';

// Components
import HomeHeader from '../components/home/HomeHeader';
import ActionsContainer from '../components/home/actionsContainer/ActionsContainer';
import ServicesContainer from '../components/home/servicesContainer/ServicesContainer';

// Interfaces
import { ProtectedPage } from '../interfaces/protectedPage';
import Background from '../components/wrappers/Background';
import { User } from '../interfaces/user';

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
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) as User: null;
  console.log('user: ', user);

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchAboutJson({ setServices });
  }, [])

  return (
    <Background className="flex flex-col p-5 space-y-5">
      <HomeHeader user={user}/>
      <ActionsContainer services={services}/>
      <ServicesContainer services={services} />
    </Background>
  );
};

export default HomePage;
