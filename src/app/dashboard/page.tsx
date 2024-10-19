"use client";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";

function UserDashboard() {

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


    return (
        <div className="flex flex-row w-full h-screen bg-black">
            <SideBar/>
            <div className="flex flex-col w-full">
                <NavBar/>
                <div className="overflow-x-auto mx-12 my-12 ">
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
            </div>
        </div>
    );
}

export default UserDashboard;