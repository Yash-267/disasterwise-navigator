
import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useToast } from "./ui/use-toast";

interface ApiKeys {
  openai?: string;
  googlemaps?: string;
}

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>(() => {
    const saved = localStorage.getItem('apiKeys');
    return saved ? JSON.parse(saved) : {};
  });

  const updateApiKeys = (keys: ApiKeys) => {
    setApiKeys(keys);
    localStorage.setItem('apiKeys', JSON.stringify(keys));
  };

  return { apiKeys, updateApiKeys };
};

const ApiKeyManager = () => {
  const [open, setOpen] = useState(false);
  const [openaiKey, setOpenaiKey] = useState('');
  const [googlemapsKey, setGooglemapsKey] = useState('');
  const { apiKeys, updateApiKeys } = useApiKeys();
  const { toast } = useToast();

  useEffect(() => {
    if (!apiKeys.openai || !apiKeys.googlemaps) {
      setOpen(true);
    }
  }, [apiKeys]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateApiKeys({
      openai: openaiKey,
      googlemaps: googlemapsKey
    });
    setOpen(false);
    toast({
      title: "API Keys Updated",
      description: "Your API keys have been saved successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter API Keys</DialogTitle>
          <DialogDescription>
            Please enter your API keys to enable map and chat functionality.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              OpenAI API Key
              <span className="ml-1 text-xs text-muted-foreground">
                (Get it from: platform.openai.com)
              </span>
            </label>
            <Input
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Google Maps API Key
              <span className="ml-1 text-xs text-muted-foreground">
                (Get it from: console.cloud.google.com)
              </span>
            </label>
            <Input
              type="password"
              value={googlemapsKey}
              onChange={(e) => setGooglemapsKey(e.target.value)}
              placeholder="AIza..."
              required
            />
          </div>
          <Button type="submit" className="w-full">Save API Keys</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyManager;
