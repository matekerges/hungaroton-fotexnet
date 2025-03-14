import React, { createContext, useState, useContext, ReactNode } from "react";

interface ErrorContextType {
    error: string | null;
    setError: (error: string | null) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorProviderProps {
    children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);

    const value = {
        error,
        setError,
    };

    return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>;
};

export const useErrorContext = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (context === undefined) {
        throw new Error("useErrorContext must be used within an ErrorProvider");
    }
    return context;
};
