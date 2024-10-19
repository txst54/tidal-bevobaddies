"use client";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { useScroll, useTransform } from "framer-motion";
import {GoogleGeminiEffect} from "@/components/ui/google-gemini-effect";
import React from "react";

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
        <div className="bg-black h-[400vh] overflow-clip w-screen relative" ref={ref}>
            <div className="sticky top-0 w-full ">
                <Navbar/>
            </div>
            <GoogleGeminiEffect
                pathLengths={[
                    pathLengthFirst,
                    pathLengthSecond,
                    pathLengthThird,
                    pathLengthFourth,
                    pathLengthFifth,
                ]}
            />
        </div>
    );
}
