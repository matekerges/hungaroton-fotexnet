import Image from "next/image";

import hungarotonLogo from "@/assets/images/logo.png";

const HeaderComponent = () => {
    return (
        <div className="bg-gray-200 h-[150px] py-10 flex flex-col justify-between items-center">
            <Image
                src={hungarotonLogo}
                alt="logo"
                width={400}
                height={100}
                priority
                className="w-[200px] md:w-[400px]"
            />
        </div>
    );
};

export default HeaderComponent;
