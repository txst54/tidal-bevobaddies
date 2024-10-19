"use client";
import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";

function UserDashboard() {
    return(
        <div className="flex flex-row w-full h-screen">
            <SideBar/>
            <div className="flex flex-col w-full">
                <NavBar/>
                {/*Code goes here*/}
            </div>
        </div>
    );
}

export default UserDashboard;