
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Leaf, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [farmName, setFarmName] = useState("");
  const [error, setError] = useState("");
  const { signUp, isLoading, supabaseConnected } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    await signUp(email, password, farmName);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Leaf className="h-10 w-10 text-farm-green" />
        </div>
        <h1 className="text-2xl font-bold">Create a FarmWise Account</h1>
        <p className="text-gray-600">Start managing your farm efficiently</p>
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
        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">
            {error}
          </div>
        )}

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
          <label htmlFor="farmName" className="block text-sm font-medium text-gray-700">
            Farm Name
          </label>
          <Input
            id="farmName"
            type="text"
            placeholder="Your Farm Name"
            required
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            disabled={!supabaseConnected}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
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

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={!supabaseConnected}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading || !supabaseConnected}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Link to="/login" className="text-farm-green hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
