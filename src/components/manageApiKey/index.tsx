"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Shield,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Plus,
  Key,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConsoleLogWriter } from "drizzle-orm";
import { Skeleton } from "@/components/ui/skeleton";

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  isActive: boolean;
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

// Zod schema for the form
const apiKeySchema = z.object({
  apiKey: z.string().min(1, "Api key is required"),
});
type ApiKeyForm = z.infer<typeof apiKeySchema>;

export default function ApiKeyManagementPage() {
  const [apiKey, setApiKey] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApiKeyForm>({
    resolver: zodResolver(apiKeySchema),
  });

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/api-key");
      console.log("response 123", response);
      if (response.ok) {
        const data = await response.json();
        console.log("data-data-data", data);
        if (data?.apiKey) {
          setApiKey(data?.apiKey);
        }
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch API keys");
    } finally {
      setIsLoading(false);
    }
  };

  const generateApiKey = async (data: ApiKeyForm) => {
    setIsCreating(true);
    try {
      const response = await fetch("/api/api-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey: data.apiKey }),
      });

      if (response.ok) {
        const resData = await response.json();
        console.log("resData-resData", resData);
        setApiKey(resData?.data);
        reset();
        setShowNewKeyDialog(false);
        fetchApiKeys();
        toast.success("API key created successfully!");
      } else {
        toast.error("Failed to create API key");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to create API key");
    } finally {
      setIsCreating(false);
    }
  };

  const deleteApiKey = async () => {
    try {
      setLoadingDelete(true);
      const response = await fetch(`/api/api-key`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("API key deleted successfully!");
        setApiKey(null);
        fetchApiKeys();
      } else {
        toast.error("Failed to delete API key");
      }
    } catch (error) {
      toast.error("Failed to delete API key");
    } finally {
      setLoadingDelete(false);

      setShowDeleteDialog(false);
    }
  };

  return (
    <div className=" px-6 py-8 bg-primary max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-white">
          API Key Management
        </h1>
        <p className="text-white/70">
          This application uses Gemini 2.0 flush API keys. Keys are hashed and
          stored safely in our database.
        </p>
      </div>

      {/* Security Notice */}
      <div className="  rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600  mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-500  mb-1">
              Security Information
            </h3>
            <p className="text-sm text-blue-700 ">
              Your Gemini API keys are securely hashed using crypto before being
              stored in our database. We can never see your actual keys once
              they're created. Keep your keys safe and never share them
              publicly.
            </p>
          </div>
        </div>
      </div>

      {/* Create New Key Button */}
      <div className="mb-6 bg-primary">
        <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
          <DialogTrigger asChild className="bg-primary ">
            <Button className="flex items-center text-white gap-2 cursor-pointer">
              <Plus className="w-4 h-4" />
              Add your Gemini API Key
            </Button>
          </DialogTrigger>
          <DialogContent className=" bg-primary border-1 border-white/40 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                Create Gemini API Key
              </DialogTitle>
              <DialogDescription className="text-white/70">
                Enter an API key. The key will be stored safely hashed in out
                database.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(generateApiKey)}
              className="space-y-4 "
            >
              <div>
                <label
                  htmlFor="keyName"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Api Key
                </label>
                <Input
                  id="keyName"
                  placeholder="e.g., Production API Key"
                  {...register("apiKey")}
                  className="text-white/80  rounded-2xl"
                  disabled={isCreating}
                />
                {errors.apiKey && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.apiKey.message}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  className="cursor-pointer"
                  type="button"
                  onClick={() => setShowNewKeyDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="cursor-pointer bg-white hover:bg-white hover:text-black text-black rounded-2xl "
                  type="submit"
                  disabled={isCreating}
                  style={{ cursor: "pointer" }}
                >
                  {isCreating ? "Creating..." : "Create Key"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* API Keys List */}
      {isLoading ? (
        <Skeleton className="h-24 w-full mb-4 bg-white/10 rounded" />
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Your API Key</h2>
          {apiKey == null ? (
            <div className="text-center py-12 text-muted-foreground">
              <Key className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No API keys found. Create your first key to get started.</p>
            </div>
          ) : (
            <div className="border-1 border-white/10 rounded-2xl p-4 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="text-md">
                      Api key:{" "}
                      <code className="bg-muted px-1 text-sm py-0.5 rounded ">
                        {apiKey}
                      </code>
                    </p>
                  </div>
                </div>
                <div className="cursor-pointer flex items-center gap-2 bg-transparent">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowDeleteDialog(true);
                    }}
                    className=" border-0 text-0 text-white hover:bg-transparent bg-transparent  cursor-pointer "
                  >
                    <Trash2 className="cursor-pointer w-4 h-4 border-0  text-white " />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className=" bg-primary border-1 border-white/40 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 bg-primary text-red-600 mb-4">
              <AlertTriangle className="w-5 h-5 " />
              Delete API Key
            </DialogTitle>
            <DialogDescription className="bg-primary text-white/70">
              Are you sure you want to delete this API key? This action cannot
              be undone, and any service using this key will stop working
              immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setShowDeleteDialog(false)}
              className="cursor-pointer text-white hover:text-white bg-transparent rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              disabled={loadingDelete}
              onClick={deleteApiKey}
              className="cursor-pointer text-red-500  hover:text-red-500  hover:bg-white rounded-2xl"
            >
              Delete Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
