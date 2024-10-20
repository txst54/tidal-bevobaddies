"use client";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {getDatabase, onValue, ref, get} from "@firebase/database";
import { app } from '../firebase'
import {ArrowsClockwise} from "@phosphor-icons/react";

const DashboardTh = ({ title, dir, bool }: { title: string; dir?: string, bool?: boolean }) => {
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
    const router = useRouter();
    const [chargebacks, setChargebacks] = useState([
        {
            transactionId: '5566778899',
            cardholderName: 'Emily Carter',
            lastFourDigits: '4321',
            transactionDate: '2024-09-19',
            disputedAmount: '$150.00',
            reasonCode: 'American Express 2491',
            reason: 'Unauthorized Transaction',
            status: 'Action',
        },
        {
            transactionId: '1234567890',
            cardholderName: 'John Doe',
            lastFourDigits: '1234',
            transactionDate: '2024-09-15',
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
            reason: 'Credit not Processed',
            status: 'Resolved',
        },

        {
            transactionId: '2048105824',
            cardholderName: 'Jake Johnson',
            lastFourDigits: '4221',
            transactionDate: '2024-09-13',
            disputedAmount: '$80.00',
            reasonCode: 'Chase 1931',
            reason: 'Processing errors',
            status: 'Resolved',
        },
        // Add more chargeback data here...
    ]);

    const fetchData = async () => {
        try {
            const db = getDatabase(app); // Get the Firebase Realtime Database instance
            const disputesRef = ref(db, 'disputes'); // Reference to the "example" path in your database
            const snapshot = await get(disputesRef); // Get the data once

            if (snapshot.exists()) {
                const data = snapshot.val();
                // Convert the data to an array if needed
                const dataArray = Object.keys(data).map((key) => ({
                    transactionId: key,
                    ...data[key],
                }));
                setChargebacks(dataArray);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleRefresh = async (e) => {
        try {
            const response = await fetch (`http://localhost:8000/refresh`);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
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
                    <tr key={index}
                        className="border-b border-l border-r border-zinc-800 transition-all duration-200 hover:bg-zinc-800"
                    onClick={() => {
                        router.push(`/review?id=${chargeback.transactionId}`);
                    }}>
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
                                                chargeback.status === 'Resolved' ? 'bg-green-200 text-green-800' :
                                                chargeback.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                                                chargeback.status === 'Action' ? 'bg-red-200 text-red-800' :
                                                'bg-gray-200 text-gray-800'
                                            }`}
                                        >
                                          {chargeback.status}
                                        </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-end space-x-4 mt-4">
                <button
                    className="text-white px-2 py-2 rounded hover:bg-zinc-500 transition duration-200"
                    onClick={handleRefresh}>
                    <ArrowsClockwise size={32} />
                </button>
            </div>
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