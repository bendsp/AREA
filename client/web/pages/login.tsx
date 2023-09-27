import Link from 'next/link';
import Button from '@mui/material/Button';

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <Link href="/home">
        <Button variant='contained'>Go to Home</Button>
      </Link>
    </div>
  );
};

export default Login;
