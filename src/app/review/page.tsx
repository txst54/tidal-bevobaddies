"use client";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "@firebase/database";
import { app } from "@/app/firebase";
import { useSearchParams } from "next/navigation";

const DashboardTh = ({ title, dir, bool }: { title: string; dir?: string; bool?: boolean }) => {
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
    name: string;
    amount: string;
}

const Chargebacks: React.FC<ChargebackProps> = ({ name, amount }) => {
    return (
        <div>
            <h2 className="text-zinc-300 pb-3">{name}</h2>
            <h2 className="text-zinc-300 text-3xl pb-3">{amount}</h2>
        </div>
    );
};

interface Evidence {
    desc: string;
    proof: string;
    title: string;
}

interface DisputeData {
    cardholderName?: string;
    disputedAmount?: string;
    evidence?: Evidence[];
    lastFourDigits?: string;
    reason?: string;
    reasonCode?: string;
    status?: string;
    transactionDate?: string;
}

function ReviewPage() {
    const [dispute, setDispute] = useState<DisputeData>({});
    const searchParams = useSearchParams();
    const transactionId = searchParams.get('id');

    const fetchDataFromFirebase = async () => {
        try {
            const db = getDatabase(app);
            const disputesRef = ref(db, `disputes/${transactionId}`);
            const disputeSnapshot = await get(disputesRef);

            if (disputeSnapshot.exists()) {
                const disputeData = disputeSnapshot.val();
                setDispute(disputeData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleClick = async (e: any) => {
        e.preventDefault();
        fetchDataFromFirebase(); 
    };

    const openFile = (filename: string) => {
        const url = `http://localhost:8000/media/${filename}.pdf`;
        window.open(url, '_blank');
    }

    useEffect(() => {
        fetchDataFromFirebase();
    }, []);

    let evidence = dispute.evidence || []; // Ensure evidence is an array
    console.log(evidence);
    return (
        <div className="flex flex-row w-full h-screen bg-black">
            <SideBar />
            <div className="flex flex-col w-full">
                <NavBar />
                <div className="m-12">
                    <h1 className="text-5xl pb-12 bg-gradient-to-br from-white via-black to-black bg-clip-text font-normal text-transparent ">
                        cardholder: {dispute.cardholderName} {/* Cardholder Name */}
                    </h1>
                    <div className="flex flex-row gap-x-32">
                        <Chargebacks name="Disputed Amount" amount={dispute.disputedAmount || "N/A"} />
                        <Chargebacks name="Last Four Digits" amount={dispute.lastFourDigits || "N/A"} />
                        <Chargebacks name="Status" amount={dispute.status || "Unknown"} />
                    </div>
                </div>
                <h3 className="font-bold text-zinc-500 text-lg px-8">Evidence</h3>
                <div className="flex-grow p-4">
                    <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
                        <thead>
                            <tr className="bg-zinc-900 text-zinc-400 uppercase text-xs">
                                <DashboardTh title={"Description"} dir={"left"} bool />
                                <DashboardTh title={"Type"} dir={"left"} bool />
                                <DashboardTh title={"Uploaded Date"} dir={"left"} bool />
                                {/*<DashboardTh title={"File"} dir={"left"} bool />*/}
                            </tr>
                        </thead>
                        <tbody className="text-zinc-400 text-sm font-light">
                            {evidence && Object.keys(evidence).length > 0 ? (
                                Object.keys(evidence).map((item, index) => (
                                    <tr key={index}
                                        onClick={(e) => {
                                            console.log("requested file");
                                            if (evidence[item].filename) {
                                                openFile(evidence[item].filename);
                                            }
                                        }}
                                        className={`border-b border-zinc-800 transition-all duration-200 hover:bg-zinc-800`}>
                                        <td className="py-4 px-6 text-zinc-300">{evidence[item].description}</td>
                                        <td className="py-4 px-6 text-zinc-300">{evidence[item].type}</td>
                                        <td className="py-4 px-6 text-zinc-300">{evidence[item].uploaded_date}</td>
                                        {/*<td className="py-4 px-6 text-zinc-300">{evidence[item].filename}</td>*/}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                <td className="py-4 px-6 text-zinc-300" colSpan={3}>No evidence provided</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            className="bg-zinc-600 text-white px-4 py-2 rounded hover:bg-zinc-500 transition duration-200"
                            onClick={handleClick}>
                            Refresh
                        </button>
                        <button
                            className="bg-zinc-600 text-white px-4 py-2 rounded hover:bg-zinc-500 transition duration-200">
                            Confirm
                        </button>
                        <button
                            className="bg-zinc-600 text-white px-4 py-2 rounded hover:bg-zinc-500 transition duration-200">
                            Deny
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewPage;
