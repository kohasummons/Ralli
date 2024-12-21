"use client";

import React, { useState } from "react";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

interface AgentConsoleProps {
  onClose: () => void;
  onAgentStart: () => void;
}

export const AgentConsole: React.FC<AgentConsoleProps> = ({
  onClose,
  onAgentStart,
}) => {
  const [error] = useState<string | null>(null);
  const { setShowAuthFlow } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();

  const handleRalliStart = () => {
    if (!isLoggedIn) {
      setShowAuthFlow(true);
    }

    onAgentStart();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ralli</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Ralli, your personal financial agent.
          </p>
          <Button onClick={handleRalliStart}>Turn on Ralli</Button>
          {error && (
            <div className="p-2 bg-red-100 text-red-700 rounded-md flex items-center">
              <AlertCircle className="mr-2" />
              {error}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
