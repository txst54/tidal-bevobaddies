import React from 'react';
import { TidalLogo } from '@phosphor-icons/react';

function NavBar() {
    return (
        <div className="flex flex-col justify-center h-16 p-4 bg-black border-b border-zinc-800 px-12">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row h-16">
                    <TidalLogo size={24} className="text-white absolute top-5" />
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-white bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-200">
                        Log In
                    </button>
                    <button className="text-black bg-white border border-transparent px-4 py-2 rounded hover:bg-gray-200 hover:text-black transition duration-200">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
