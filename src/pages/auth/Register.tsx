
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Leaf } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [farmName, setFarmName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    
    if (!farmName.trim()) {
      setError("Farm name is required");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!validateForm()) return;

    try {
      await signUp(email, password, farmName);
      setSuccess("Account created! Please check your email for verification.");
      toast.success("Account created! Please check your email for verification.");
      // Redirect to login with a state parameter
      navigate('/login', { state: { fromRegister: true } });
    } catch (err: any) {
      // Handle rate limiting errors specifically
      if (err.message && err.message.includes("request this after")) {
        setError("Please wait a moment before trying again. " + err.message);
      } else {
        setError(err.message || "Failed to sign up. Please try again later.");
      }
    }
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive" className="text-sm text-red-800 bg-red-100 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="text-sm text-green-800 bg-green-100 border-green-200">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
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
            className="w-full"
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
            className="w-full"
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
            className="w-full"
          />
          <p className="text-xs text-gray-500">Must be at least 6 characters</p>
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
            className="w-full"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
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
