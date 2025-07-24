import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <Image
          src="/macroscope-logo.png"
          alt="Prasso.ai Logo"
          width={200}
          height={200}
          className="rounded-full mx-auto mb-8"
          priority
        />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          Prasso.ai UI Engineer Technical Interview
        </h1>
      </div>
    </div>
  );
}
