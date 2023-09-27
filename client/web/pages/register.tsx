import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';

const RegisterPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-[#050014]">
        <div className="bg-[#282828] p-8 rounded shadow-lg">
          <h2 className="text-2xl text-white font-bold mb-4">Register Page</h2>

          <Link href="/login">
            <Button variant="outlined" fullWidth className="border-white text-white hover:border-[#240090] hover:text-[#240090]">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    )
}

export default RegisterPage;
