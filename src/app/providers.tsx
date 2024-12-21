"use client";

import React from 'react';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <DynamicContextProvider
            settings={{
                environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
                walletConnectors: [EthereumWalletConnectors],
            }}
        >
            {children}
        </DynamicContextProvider>
    );
};
