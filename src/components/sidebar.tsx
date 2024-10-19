import React from 'react';
import { Lock, Cardholder, Warning, House, Trash, AddressBook, QuestionMark, TidalLogo} from '@phosphor-icons/react';


function SideBar() {
    return (
        <div className="h-full bg-black w-20">
            <div className="flex flex-col items-center pt-3">
                <div className="rounded-lg bg-grey">
                    <TidalLogo size={32} className='text-white'/>
                </div>
                <div className="pt-6"></div>
                <div className="rounded-lg hover:cursor-pointer hover:bg-slate-600 p-3 transition-all duration-200">
                    <House size={32} className='text-white'/>
                </div>
                <div className="pt-6"></div>
                <div className="rounded-lg hover:cursor-pointer hover:bg-slate-600 p-3 transition-all duration-200">
                    <Lock size={32} className='text-white' />
                </div>
                <div className="pt-6"></div>
                <div className="rounded-lg hover:cursor-pointer hover:bg-slate-600 p-3 transition-all duration-200">
                    <Cardholder size={32} className='text-white' />
                </div>
                <div className="pt-6"></div>
                <div className="rounded-lg hover:cursor-pointer hover:bg-slate-600 p-3 transition-all duration-200">
                    <QuestionMark size={32} className='text-white' />
                </div>
                <div className="pt-6"></div>
                <div className="rounded-lg hover:cursor-pointer hover:bg-slate-600 p-3 transition-all duration-200">
                    <Warning size={32} className='text-white' />
                </div>
                <div className="pt-6"></div>
                <div className="rounded-lg hover:cursor-pointer hover:bg-slate-600 p-3 transition-all duration-200">
                    <AddressBook size={32} className='text-white' />
                </div>
                <div className="pt-6"></div>
                <div onClick={() => {console.log("logging out")}} className="rounded-lg hover:cursor-pointer hover:bg-slate-900 p-3 transition-all duration-200">

                </div>
            </div>

        </div>
    );
}

export default SideBar;