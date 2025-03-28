
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Leaf, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoading, supabaseConnected } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Leaf className="h-10 w-10 text-farm-green" />
        </div>
        <h1 className="text-2xl font-bold">Welcome to FarmWise</h1>
        <p className="text-gray-600">Sign in to your account</p>
      </div>

      {!supabaseConnected && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Supabase Connection Required</AlertTitle>
          <AlertDescription>
            <p>To use this application, please connect to Supabase:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Click the green "Supabase" button at the top of this page</li>
              <li>Follow the prompts to connect your Supabase project</li>
              <li>Return to this page after connecting</li>
            </ol>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!supabaseConnected}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link to="/forgot-password" className="text-sm text-farm-green hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!supabaseConnected}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || !supabaseConnected}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account?</span>{" "}
          <Link to="/register" className="text-farm-green hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
