"use client";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";

const DashboardTh = ({ title, dir, bool }: { title: string; dir: string | undefined, bool: boolean }) => {
    return (
        <th
            className={`py-3 px-6 text-left ${bool ? "font-semibold" : "font-medium"} border-zinc-800
      ${dir === "left" ? "border-t border-l border-b" :
                dir === "right" ? "border-t border-r border-b" :
                    "border-y"} 
      border-collapse`}
        >
            {title}
        </th>
    );
};

import React from 'react';

interface ChargebackProps {
    subtitle: string;
    amount: string;
    percentage: string;
    percentageChange: string;
    isNegative: boolean;
}

const Chargebacks: React.FC<ChargebackProps> = ({ subtitle, amount, percentage, percentageChange, isNegative }) => {
    return (
        <div>
            <h2 className="text-zinc-300 pb-3">
                {subtitle}
            </h2>
            <h2 className="text-zinc-300 text-3xl pb-3">
                {amount}
            </h2>
            <h2 className="text-zinc-300 pb-12 text-sm">
                <span className={`${isNegative ? "text-red-400" : "text-green-400"}`}>{percentage}</span> {percentageChange}
            </h2>
        </div>
    );
};


const ChargebackTable = () => {
    const chargebacks = [
        {
            transactionId: '1234567890',
            cardholderName: 'John Doe',
            lastFourDigits: '1234',
            transactionDate: '2024-08-12',
            disputedAmount: '$250.00',
            reasonCode: 'Visa 13.1',
            reason: 'Merchandise Not Received',
            status: 'Pending',
        },
        {
            transactionId: '0987654321',
            cardholderName: 'Jane Smith',
            lastFourDigits: '5678',
            transactionDate: '2024-09-15',
            disputedAmount: '$100.00',
            reasonCode: 'Mastercard 4853',
            reason: 'Goods or Services Not Received',
            status: 'Resolved',
        },
        // Add more chargeback data here...
    ];

    return (
        <div className="overflow-x-auto ">
            <table className="min-w-full table-auto">
                <thead>
                <tr className="bg-zinc-900 text-zinc-400 uppercase text-xs">
                    <DashboardTh title={"ID"} dir={"left"} bool />
                    <DashboardTh title={"Client"} dir={"left"} bool />
                    <DashboardTh title={""} />
                    <DashboardTh title={""} />
                    <DashboardTh title={"Banking"} dir="left" bool />
                    <DashboardTh title={""} />
                    <DashboardTh title={""} />
                    <DashboardTh title={""} dir={"right"} bool />
                </tr>
                </thead>
                <thead>
                <tr className="bg-zinc-900 text-zinc-400 uppercase font-medium text-xs">
                    <DashboardTh title={""} dir={"left"} />
                    <DashboardTh title={"Cardholder"} />
                    <DashboardTh title={"Last 4 Digits"} />
                    <DashboardTh title={"Transaction Date"} />
                    <DashboardTh title={"Disputed Amount"} />
                    <DashboardTh title={"Reason Code"} />
                    <DashboardTh title={"Reason"} />
                    <DashboardTh title={"Status"} dir={"right"} />
                </tr>
                </thead>
                <tbody className="text-zinc-400 text-sm font-light">
                {chargebacks.map((chargeback, index) => (
                    <tr key={index} className="border-b border-l border-r border-zinc-800 transition-all duration-200 hover:bg-zinc-800">
                        <td className="py-5 px-6 text-left whitespace-nowrap text-zinc-300">{chargeback.transactionId}</td>
                        <td className="py-3 px-6 text-left">{chargeback.cardholderName}</td>
                        <td className="py-3 px-6 text-left">{chargeback.lastFourDigits}</td>
                        <td className="py-3 px-6 text-left">{chargeback.transactionDate}</td>
                        <td className="py-3 px-6 text-left">{chargeback.disputedAmount}</td>
                        <td className="py-3 px-6 text-left">{chargeback.reasonCode}</td>
                        <td className="py-3 px-6 text-left">{chargeback.reason}</td>
                        <td className="py-3 px-6 text-left">
                                        <span
                                            className={`py-1 px-3 rounded-full text-xs ${
                                                chargeback.status === 'Resolved' ?
                                                    'bg-green-200 text-green-800' :
                                                    'bg-yellow-200 text-yellow-800'
                                            }`}
                                        >
                                          {chargeback.status}
                                        </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

function UserDashboard() {
    return (
        <div className="flex flex-row w-full h-screen bg-black">
            <SideBar/>
            <div className="flex flex-col w-full">
                <NavBar/>
                <div className="m-12">
                    <h1 className="text-5xl pb-12 bg-gradient-to-br from-white via-black to-black bg-clip-text font-normal text-transparent ">
                        Chargebacks
                    </h1>
                    <div className="flex flex-row gap-x-32">
                        <Chargebacks subtitle="Avg. Monthly Savings" amount={"$4,250.30"} percentage="+12.34%" percentageChange="From last month"/>
                        <Chargebacks subtitle="Avg. Daily Resolutions" amount={"67"} percentage="+6.40%" percentageChange="From yesterday"/>
                        <Chargebacks subtitle="Request Volume" amount={"3,067"} percentage="-17.57%" percentageChange="From yesterday" isNegative/>
                    </div>
                    <ChargebackTable />
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;