import React from 'react';
import { useRouter } from 'next/router';

const NewActionButton = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/newAction');
    };

    return (
        <button onClick={handleButtonClick} className="w-full border-dashed border-2 border-black hover:bg-yellow-600 rounded-sm p-3">
            <div className="text-center font-bold">
                Create New Action
            </div>
        </button>
    );
};

export default NewActionButton;
