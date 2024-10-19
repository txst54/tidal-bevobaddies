"use client";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";

function reviewPage() {
    return (
        <div className="flex flex-row w-full h-screen bg-black">
            <SideBar />
            <div className="flex flex-col w-full">
                <NavBar />
                <div className="flex-grow p-4">
                    <table className="min-w-full border-collapse rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-black text-white">
                                <th className="border border-gray-600 p-4 text-left">Requirements</th>
                                <th className="border border-gray-600 p-4 text-left">Proofs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    requirement: "Proof of shipping",
                                    proof: ""
                                },
                                {
                                    requirement: "Sales or transaction receipt",
                                    proof: ""
                                },
                                {
                                    requirement: "Matching bill-to and ship-to addresses",
                                    proof: ""
                                },
                                {
                                    requirement: "Proof of delivery",
                                    proof: ""
                                },
                                {
                                    requirement: "Positive AVS response",
                                    proof: ""
                                },
                                {
                                    requirement: "Any conversations with the customer",
                                    proof: ""
                                }
                            ].map((item, index) => (
                                <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-800' : 'bg-black'} text-white hover:bg-gray-700`}>
                                    <td className="border border-gray-600 p-4">{item.requirement}</td>
                                    <td className="border border-gray-600 p-4">{item.proof}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end space-x-4 mt-4"> {/* Added margin top for spacing */}
                        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
                            Confirm
                        </button>
                        <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                            Deny
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default reviewPage;
