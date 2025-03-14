"use client";

import React, { Suspense } from "react";

import HomePage from "@/page/home/HomePageComponent";
import Loading from "./loading";

import { FilterProvider } from "@/page/home/contexts/FilterContext";
import { PaginationProvider } from "@/page/home/contexts/PaginationContext";
import { ErrorProvider } from "@/page/home/contexts/ErrorContext";

import "@/styles/global.css";

const Page: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <FilterProvider>
                <PaginationProvider>
                    <ErrorProvider>
                        <HomePage />
                    </ErrorProvider>
                </PaginationProvider>
            </FilterProvider>
        </Suspense>
    );
};

export default Page;
