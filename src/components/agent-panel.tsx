"use client";

import { useConversation } from "@11labs/react";
import { getOnChainTools } from "@goat-sdk/adapter-eleven-labs";

import { isEthereumWallet } from "@dynamic-labs/ethereum";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import { coingecko } from "@goat-sdk/plugin-coingecko";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";
import { erc20, USDC, MODE } from "@goat-sdk/plugin-erc20";

import React, { useState, useCallback } from "react";
import { Play, Pause } from "lucide-react";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext; // Add legacy webkitAudioContext
  }
}

export const AgentPanel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const isLoggedIn = useIsLoggedIn();
  const { primaryWallet, sdkHasLoaded } = useDynamicContext();

  const isConnected = sdkHasLoaded && isLoggedIn && primaryWallet;

  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      if (!primaryWallet) {
        throw new Error("Wallet not connected");
      }

      let tools = null;

      if (isEthereumWallet(primaryWallet)) {


        tools = await getOnChainTools({
          wallet: viem(await primaryWallet.getWalletClient()),
          plugins: [
            sendETH(),
            erc20({ tokens: [USDC, MODE] }),
            coingecko({
              apiKey: process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? "",
            }),
          ],
          options: {
            logTools: true,
          },
        });
      } else {
        throw new Error("Unsupported wallet type");
      }

      if (!tools) {
        throw new Error("Failed to initialize tools");
      }

      console.log("tools", tools);

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVEN_LABS_AGENT_ID ?? "",
        clientTools: tools,
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation, primaryWallet]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const togglePlayPause = async () => {
    if (!isConnected) return;

    try {
      if (isPlaying) {
        stopConversation();
      } else {
        startConversation();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error toggling conversation:", error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white rounded-full shadow-lg hover:shadow-2xl p-3 flex items-center gap-4 border-stone-300 w-[300px] z-50">
      <button
        onClick={togglePlayPause}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
          ${
            isPlaying
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "bg-pink-500 text-white hover:bg-pink-600"
          }`}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </button>
      <div>
        {conversation.status === "connected" ? (
          <p>Ralli is {conversation.isSpeaking ? "speaking" : "listening"}</p>
        ) : (
          <p>Hit the button to start Ralli</p>
        )}
      </div>
    </div>
  );
};
