import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="text-white">
        <div className="bg-primary-soft min-h-[132px] flex items-center">
          <div className="flex flex-1 w-full max-w-7xl mx-auto">
            <div className="flex flex-1 justify-start">
              <Image
                src="/images/logos/logo-letters.svg"
                alt="logo"
                className="invert"
                width={200}
                height={50}
              />
            </div>
            <div className="flex flex-1 justify-center">
              <div className="flex items-center gap-2 aspect-square">
                <Image
                  src="/images/logos/logo-symbol.svg"
                  alt="logo"
                  className="invert"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="flex flex-1 justify-end">
              <button className="p-2 bg-primary rounded-md">Sign In</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <div className="absolute h-[168px] bg-primary-soft w-full top-0" />
          <div className="relative top-1 w-full max-h-[336px] max-w-[520px] rounded-md overflow-hidden aspect-square">
            <Image
              src="/images/coworking/atzomx.jpg"
              alt="header"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
