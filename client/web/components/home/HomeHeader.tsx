import { useState } from 'react';
import { User } from '../../interfaces/user';
import Router from 'next/router';

interface HomeHeaderProps {
    user: User | null;
}

const HomeHeader = ({ user }: HomeHeaderProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = () => {
        document.cookie = 'auth0.is.authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.reload();
        Router.push('api/auth/logout');
        setIsDropdownOpen(false);
    };

    return (
        <div className="bg-white shadow-md p-5 rounded-2xl flex justify-between items-center">
          <a className="text-2xl font-bold">Hello {user?.nickname}</a>
          <div className="relative group flex items-center">
            <button onClick={toggleDropdown} className="text-2xl group-hover:bg-gray-100 rounded-full w-10 h-10">
              {user?.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="rounded-full" src={user?.picture} alt="user" />
              ) : (
                <div>{isDropdownOpen ? '-' : '+'}</div>
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 top-10 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-fit p-3 space-y-2">
                <div className="">{user?.email}</div>
                <button onClick={handleSignOut} className="py-1 w-full rounded-xl bg-gray-200 hover:bg-gray-300">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
    );
}

export default HomeHeader;
