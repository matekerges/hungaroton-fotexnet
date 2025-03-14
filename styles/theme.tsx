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
                root: {
                    borderRadius: "0px",
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    borderRadius: "0px",
                    width: "40px",
                    '&.Mui-selected': {
                        backgroundColor: primaryColor,
                        color: 'white',

                        '&:hover': {
                            backgroundColor: primaryColor,
                            color: 'white',
                        },
                    },
                },

            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: "0px",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: "0px",
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: "0px",
                },

            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: "0px",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "0px",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "0px",
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
