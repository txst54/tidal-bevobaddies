import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black h-screen w-screen relative">
      <div className="flex flex-col items-center w-full pt-24">
        <h1 className="text-7xl w-2/5 py-4 text-center bg-gradient-to-br from-white via-zinc-300 to-zinc-900 bg-clip-text text-transparent">
          a new way to love sales again.
        </h1>
        <p className="text-lg text-zinc-400 pt-6 w-2/5 text-center">proactively combat chargeback disputes, streamline your operations, and minimize overhead with a tailored management system.</p>
      </div>
    </div>
  );
}
