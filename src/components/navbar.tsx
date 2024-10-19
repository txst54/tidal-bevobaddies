import React from 'react';
import { MagnifyingGlass, User, Bell} from '@phosphor-icons/react';

function NavBar() {
    return (
        <div className="flex flex-col justify-center h-16 p-4 bg-black">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row bg-black">
                    <MagnifyingGlass size={24} className="text-white absolute left-50 top-5 z-10" />
                    <input className="pl-10 py-2 font-urbanist bg-black text-white focus:border-0 focus:outline-none" placeholder="Search" />
                </div>
                <div className="flex flex-row items-center">
                    <div className="font-urbanist p-6 hover:cursor-pointer hover:text-zinc-300 text-white transition-all duration-200">
                        Support
                    </div>
                    <div className="font-urbanist p-6 hover:cursor-pointer hover:text-zinc-300 text-white transition-all duration-200">
                        Settings
                    </div>
                    <div className="px-6 pr-10">
                        <Bell size={24} className='text-white hover:cursor-pointer hover:text-zinc-300'/>
                    </div>
                    <div className="px-6 bg-zinc-900 rounded-full h-10 flex flex-col justify-center hover:cursor-pointer hover:text-zinc-300'">
                        <User size={24} className='text-white'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;