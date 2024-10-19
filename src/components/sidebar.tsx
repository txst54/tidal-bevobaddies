import React from 'react';
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
const IconButton = ({ Icon, onClick, hoverColor = 'bg-zinc-700' }: { Icon: React.FC; onClick?: () => void; hoverColor?: string }) => {
    return (
        <div
            onClick={onClick}
            className={`rounded-lg hover:cursor-pointer hover:${hoverColor} p-3 transition-all duration-200`}
        >
            <Icon size={32} className='text-white' />
        </div>
    );
};

// Sidebar component
function SideBar() {
    return (
        <div className="h-full bg-black w-20 border-r border-zinc-800">
            <div className="flex flex-col items-center pt-3">
                {/* Logo */}
                <div className="rounded-lg bg-grey">
                    <TidalLogo size={32} className='text-white' />
                </div>

                <div className="pt-6"></div>

                {/* Sidebar items */}
                <IconButton Icon={House} onClick={() => console.log('Home clicked')} />
                <div className="pt-6"></div>
                <IconButton Icon={Lock} onClick={() => console.log('Lock clicked')} />
                <div className="pt-6"></div>
                <IconButton Icon={Cardholder} onClick={() => console.log('Cardholder clicked')} />
                <div className="pt-6"></div>
                <IconButton Icon={QuestionMark} onClick={() => console.log('QuestionMark clicked')} />
                <div className="pt-6"></div>
                <IconButton Icon={Warning} onClick={() => console.log('Warning clicked')} />
                <div className="pt-6"></div>
                <IconButton Icon={AddressBook} onClick={() => console.log('AddressBook clicked')} />
                <div className="pt-6"></div>

                {/* Logout Button with different hover color */}
                <IconButton
                    Icon={SignOut}
                    onClick={() => console.log('Logging out')}
                    hoverColor="bg-zinc-700"
                />
            </div>
        </div>
    );
}

export default SideBar;