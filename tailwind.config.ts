import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./flows/**/*.{js,ts,jsx,tsx,mdx}",],
    theme: {
        extend: {
            screens: {
                sm: "320px",
                md: "640px",
                lg: "1024px",
                xl: "1280px",
            },
            colors: {
                currentColor: "currentColor",
                transparent: "transparent",
                fontColor: "oklch(0.278 0.033 256.848)",
            },
            fontFamily: {
                sans: ["Montserrat", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
