
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Leaf } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{text: string, type: "success" | "error"} | null>(null);
  const { signIn, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Check if redirected from verification
    const isVerified = location.search.includes('email_confirmed=true');
    if (isVerified) {
      setMessage({
        text: "Email verified successfully! You can now log in.",
        type: "success"
      });
    }
    
    // Check if redirected from registration
    const fromRegister = location.state?.fromRegister;
    if (fromRegister) {
      setMessage({
        text: "Account created successfully! Please check your email for verification.",
        type: "success"
      });
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (!email.trim() || !password.trim()) {
      setMessage({
        text: "Please enter both email and password.",
        type: "error"
      });
      return;
    }
    
    try {
      await signIn(email, password);
    } catch (error: any) {
      setMessage({
        text: error.message || "Failed to sign in. Please check your credentials.",
        type: "error"
      });
    }
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

      {message && (
        <Alert 
          variant={message.type === "error" ? "destructive" : "default"}
          className={message.type === "error" 
            ? "text-sm text-red-800 bg-red-100 border-red-200" 
            : "text-sm text-green-800 bg-green-100 border-green-200"
          }
        >
          <AlertDescription>{message.text}</AlertDescription>
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
            className="w-full"
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
            className="w-full"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
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
