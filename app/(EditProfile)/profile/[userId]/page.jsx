"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/Store/userStore";
import LoadingPage from "@/components/Custom/Loader";
import { User, Mail, Phone, Lock } from "lucide-react";
import toast from "react-hot-toast";

const UserProfile = () => {
    const router = useRouter();
    const { user, loading, updateUser, checkAuth } = useAuthStore();

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        password: "",
    });

    useEffect(() => {
        const verifyUser = async () => {
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                router.push("/auth/login");
            }
        };
        verifyUser();
    }, [checkAuth, router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId: user._id, updatedData: formData });
            toast.success("Profile updated successfully!");
            router.push('/');
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update profile.");
        }
    };

    if (!user) return <LoadingPage />;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md mx-auto shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        User Profile
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Full Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-10"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10 bg-gray-50"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-sm font-medium">
                                Phone Number
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="pl-10"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                New Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10"
                                    placeholder="Enter new password (optional)"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primaryColor text-white"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserProfile;