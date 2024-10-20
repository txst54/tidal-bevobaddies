import React from 'react';
import Link from 'next/link';

import {
    Lock,
    Cardholder,
    Warning,
    House,
    AddressBook,
    QuestionMark,
    TidalLogo,
    SignOut
} from '@phosphor-icons/react';

// Reusable IconButton component
const IconButton = ({ Icon, to, hoverColor = 'bg-zinc-700' }: { Icon: React.FC; to?: string; hoverColor?: string }) => {
    return (
        <Link href={to} passHref>
            <div className={`rounded-lg hover:cursor-pointer hover:${hoverColor} p-3 transition-all duration-200`}>
                <Icon size={32} className='text-white' />
            </div>
        </Link>
    );
};

// Sidebar component
function SideBar() {
    return (
        <div className="h-full bg-black w-20 border-r border-zinc-800">
            <div className="flex flex-col items-center pt-3">
                {/* Logo */}
                <Link href="/" passHref>
                    <div className="rounded-lg hover:cursor-pointer p-3 transition-all duration-200">
                        <TidalLogo size={32} className='text-white' />
                    </div>
                </Link>

                <div className="pt-6"></div>

                {/* Sidebar items */}
                <IconButton Icon={House} to="/dashboard" />
                <div className="pt-6"></div>
                <IconButton Icon={Lock} to="/lock" />
                <div className="pt-6"></div>
                <IconButton Icon={Cardholder} to="/cardholder" />
                <div className="pt-6"></div>
                <IconButton Icon={QuestionMark} to="/help" />
                <div className="pt-6"></div>
                <IconButton Icon={Warning} to="/warnings" />
                <div className="pt-6"></div>
                <IconButton Icon={AddressBook} to="/review" />
                <div className="pt-6"></div>

                {/* Logout Button with different hover color */}
                <IconButton
                    Icon={SignOut}
                    to="/logout"
                    hoverColor="bg-zinc-700"
                />
            </div>
        </div>
    );
}

export default SideBar;