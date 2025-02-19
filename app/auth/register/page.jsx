'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import useAuthStore from "@/Store/userStore"
import { Lock, Mail, MoveRight, Phone, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const RegisterAccount = () => {

    const [email, setemail] = useState('');
    const [name, setname] = useState('');
    const [  phoneNumber,   setphoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { registerUser, error, loading } = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input validation
        if (!email || !password || !phoneNumber || !name || !confirmPassword) {
            toast.error("All fields are required");
            return; // stop form submission
        }

        if (name.length < 3) {
            toast.error("Username must be at least 3 characters.");
            return; // stop form submission
        }

        const phoneRegex = /^(98|97)\d{8}$/;
        if (!phoneRegex.test( phoneNumber)) {
            toast.error("Invalid phone number!");
            return; // stop form submission
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format!");
            return; // stop form submission
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return; // stop form submission
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return; // stop form submission
        }

        if (!passwordRegex.test(password)) {
            toast.error("Password must include an uppercase letter, a number, and a special character.");
            return; // stop form submission
        }

        console.log(email,password,phoneNumber, name);
        
        const success = await registerUser(email, password, phoneNumber, name);

        if (!success) {
            toast.error("Please try again!");
        } else {
            toast.success("Account created successfully!");
            router.push('/auth/emailverify'); 
        }


        if(loading) return <div>
            <LoadingPage/>
        </div>

    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div>
                <Card>
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primaryColor to-purple-600 bg-clip-text text-transparent">
                            Create new account
                        </CardTitle>
                        <CardContent>
                            <form className="mt-8" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <div className="relative group animate-slideInLeft">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primaryColor transition-colors duration-200" size={20} />
                                        <Input
                                            type="text"
                                            name="username"
                                            placeholder="Full name"
                                            value={name}
                                            onChange={(e) => setname(e.target.value)}
                                            className="pl-10 h-12 w-full lg:w-[20rem] border-gray-200 focus:border-primaryColor focus:ring-primaryColor transition-all duration-200 bg-white/70 hover:bg-white"
                                            required
                                        />
                                    </div>

                                    <div className="relative group animate-slideInRight">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primaryColor transition-colors duration-200" size={20} />
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                            className="pl-10 h-12 w-full lg:w-[20rem] border-gray-200 focus:border-primaryColor focus:ring-primaryColor transition-all duration-200 bg-white/70 hover:bg-white"
                                            required
                                        />
                                    </div>

                                    <div className="relative group animate-slideInLeft">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primaryColor transition-colors duration-200" size={20} />
                                        <Input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone"
                                            value={phoneNumber}
                                            onChange={(e) => setphoneNumber(e.target.value)}
                                            className="pl-10 h-12 w-full lg:w-[20rem] border-gray-200 focus:border-primaryColor focus:ring-primaryColor transition-all duration-200 bg-white/70 hover:bg-white"
                                            required
                                        />
                                    </div>

                                    <div className="relative group animate-slideInRight">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primaryColor transition-colors duration-200" size={20} />
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10 h-12 w-full border-gray-200 focus:border-primaryColor focus:ring-primaryColor transition-all duration-200 bg-white/70 hover:bg-white"
                                            required
                                        />
                                    </div>

                                    <div className="relative group animate-slideInLeft">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primaryColor transition-colors duration-200" size={20} />
                                        <Input
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="pl-10 h-12 w-full border-gray-200 focus:border-primaryColor focus:ring-primaryColor transition-all duration-200 bg-white/70 hover:bg-white"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-8 bg-gradient-to-r from-primaryColor to-purple-600 text-white font-medium w-full h-12 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed animate-fadeIn"
                                    disabled = {loading}
                                >
                               {loading ? "Sign up.." : "Sign up"}      <MoveRight />
                                </Button>
                            </form>
                        </CardContent>

                        <div className="mt-4 text-center animate-slideInUp">
                            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                Already have an account?{" "}
                                <span className="font-medium text-blue-600 hover:text-blue-700" >Sign up</span>
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

                        <Button>Google</Button>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
};

export default RegisterAccount;
