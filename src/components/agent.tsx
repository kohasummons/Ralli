"use client";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const Agent = () => {
  const { sdkHasLoaded } = useDynamicContext();

  return (
    <div className="mt-4 mr-4 ml-auto overflow-hidden">
      {!sdkHasLoaded ? (
        <div className="bg-white px-5 py-3 text-sm font-bold rounded-lg">
          Loading...
        </div>
      ) : (
        <div className="relative flex">
          <DynamicWidget />
        </div>
      )}
    </div>
  );
};
