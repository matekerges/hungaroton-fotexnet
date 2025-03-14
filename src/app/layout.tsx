import Head from "next/head";

import HeaderComponent from "@/page/home/components/Header";

type TProps = {
    children?: React.ReactNode;
};

const LayoutComponent = ({ children }: TProps) => {
    return (
        <html lang="hu" className="bg-gray-200">
            <body>
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <title key="title">HUNGAROTON Artist List</title>
                </Head>
                <div className="h-full min-h-screen w-full overflow-auto bg-gray-100">
                    <HeaderComponent />
                    <main className="min-h-[calc(100vh-230px)] md:min-h-[calc(100vh-300px)] px-4 md:px-10 lg:px-20 py-10 mx-auto max-w-[1600px]">
                        {children}
                    </main>
                    <div className="bg-gray-200 py-10 flex gap-4 justify-center h-[115px] md:h-[150px] items-center">
                        <span>HUNGAROTON</span>
                        <span>|</span>
                        <span>2025</span>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default LayoutComponent;
