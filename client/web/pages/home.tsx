import Link from 'next/link';
import Button from '@mui/material/Button';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/login">
        <Button variant='contained'>Go to Login</Button>
      </Link>
    </div>
  );
};

export default Home;
