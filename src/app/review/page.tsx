"use client";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import {useEffect, useState} from "react";
import {get, getDatabase, ref, set} from "@firebase/database";
import {app} from "@/app/firebase";
import {useSearchParams} from "next/navigation";

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

interface SourceData {
    avsResponse?: string,
    billAddresses?: string,
    conversations?: string,
    deliveryProof?: string,
    shippingProof?: string,
    transactionReceipt?: string
}

function reviewPage() {
    const [table, setTable] = useState<SourceData>({});
    const searchParams = useSearchParams();
    const transactionId = searchParams.get('id');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getDatabase(app); // Get the Firebase Realtime Database instance
                const exampleRef = ref(db, `sources/${transactionId}`); // Reference to the "example" path in your database
                const snapshot = await get(exampleRef); // Get the data once

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setTable(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="flex flex-row w-full h-screen bg-black">
            <SideBar />
            <div className="flex flex-col w-full">
                <NavBar />
                <div className="flex-grow p-4">
                    <p>{transactionId}</p>
                    <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
                        <thead>
                        <tr className="bg-zinc-900 text-zinc-400 uppercase text-xs">
                            <DashboardTh title={"Requirements"} dir={"left"} bool/>
                            <DashboardTh title={"Proofs"} dir={"left"} bool/>
                        </tr>
                        </thead>
                        <tbody className="text-zinc-400 text-sm font-light">
                        {[
                            {
                                requirement: "Proof of shipping",
                                proof: table.shippingProof ? table.shippingProof : "NA",
                            },
                            {
                                requirement: "Sales or transaction receipt",
                                proof: table.transactionReceipt ? table.transactionReceipt : "NA",
                            },
                            {
                                requirement: "Matching bill-to and ship-to addresses",
                                proof: table.billAddresses ? table.billAddresses : "NA",
                            },
                            {
                                requirement: "Proof of delivery",
                                proof: table.deliveryProof ? table.deliveryProof : "NA",
                            },
                            {
                                requirement: "Positive AVS response",
                                proof: table.avsResponse ? table.avsResponse : "NA",
                            },
                            {
                                requirement: "Any conversations with the customer",
                                proof: table.conversations ? table.conversations : "NA",
                            }
                        ].map((item, index) => (
                            <tr key={index}
                                className={`border-b border-zinc-800 transition-all duration-200 hover:bg-zinc-800`}>
                                <td className="py-4 px-6 text-zinc-300">{item.requirement}</td>
                                <td className="py-4 px-6 text-zinc-300">{item.proof}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end space-x-4 mt-4"> {/* Added margin top for spacing */}
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

export default reviewPage;
