import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const primaryColor = "#007799";

const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
            contrastText: "#FFFFFF",
        },
    },
    typography: {
        fontFamily: "var(--font-montserrat)",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    color: "#FFFFFF",
                    backgroundColor: primaryColor,
                    "&:hover": {
                        opacity: 0.8,
                        "@media (hover: none)": {
                            opacity: 1,
                        },
                    },
                },
            },
        },
    },
});

interface IThemeProps {
    children: React.ReactNode;
}

export default function Theme(props: IThemeProps) {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
