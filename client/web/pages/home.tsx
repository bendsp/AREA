import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/login">
        <div>Go to Login</div>
      </Link>
    </div>
  );
};

export default Home;
