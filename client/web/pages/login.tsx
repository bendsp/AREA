import Link from 'next/link';

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <Link href="/home">
        <div>Go to Home</div>
      </Link>
    </div>
  );
};

export default Login;
