"use client";

import LoadingPage from "@/components/Custom/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/Store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(true);

  const { login, loading, error, user, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setAuthLoading(false);
    };
    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success("Login successful!");
      router.push("/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md animate-fadeIn">
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primaryColor to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-500 text-center">
              Sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group animate-slideInLeft">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primaryColor transition-colors duration-200" size={20} />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 w-full lg:w-[20rem] border-gray-200 focus:border-primaryColor focus:ring-primaryColor transition-all duration-200 bg-white/70 hover:bg-white"
                    required
                  />
                </div>

                <div className="relative group animate-slideInRight">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primaryColor transition-colors duration-200" size={20} />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-primaryColor focus:ring-primaryColor transition-all duration-200 bg-white/70 hover:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link 
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                className="w-full h-12 bg-gradient-to-r from-primaryColor to-purple-600 hover:from-primaryColor hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed animate-fadeIn"
                disabled={loading}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight size={18} className="animate-pulse" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center animate-slideInUp">
              <Link
                href="/auth/register"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                Don't have an account?{" "}
                <span className="font-medium text-blue-600 hover:text-blue-700">
                  Sign up
                </span>
              </Link>
            </div>


            <div className="relative flex items-center justify-center mt-6 animate-fadeIn">
              
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative px-4 bg-white/80">
                <span className="text-sm text-gray-500">Or continue with</span>
              </div>
            </div>

            

            {error && (
              <div className="animate-fadeIn">
                <p className="text-red-500 text-center text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;