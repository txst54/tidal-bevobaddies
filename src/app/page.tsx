import Image from "next/image";
import Navbar from "@/components/navbar";
import { useScroll, useTransform } from "framer-motion";

export default function Home() {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
    const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
    const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
    const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
    const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
    return (
        <div className="bg-black h-screen w-screen relative">
            <Navbar/>
            <div className="flex flex-col items-center w-full pt-24">
                <h1 className="text-7xl w-2/5 py-4 text-center bg-gradient-to-br from-white via-zinc-300 to-zinc-900 bg-clip-text text-transparent">
                    a new way to love sales again.
                </h1>
                <p className="text-lg text-zinc-400 pt-6 w-2/5 text-center">proactively combat chargeback disputes,
                    streamline your operations, and minimize overhead with a tailored management system.</p>
                <button className="bg-white rounded-lg py-2 px-3 mt-12">Get Started</button>
            </div>
        </div>
    );
}
