"use client"

import { useEffect, useState } from 'react';
import LoadingPage from '@/components/Custom/Loader';
import useAuthStore from '@/Store/userStore';
import { useRouter } from 'next/navigation';
import { Edit, LogOut, ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const router = useRouter();
  const { user, loading, checkAuth, logout } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check the authentication status
    setIsCheckingAuth(true);
    checkAuth().finally(() => setIsCheckingAuth(false)); // Removed token from here, it's already retrieved inside checkAuth
  }, [checkAuth]);

  if (isCheckingAuth || loading) {
    return <LoadingPage />;
  }

  if (!user) {
    router.push("/");
    return <LoadingPage />;
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      logout();
      router.push("/auth/login"); // Redirect to login page after logout
    } catch (error) {
      toast.error(error.message || "Unable to logout");
    }
  }

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-gray-100  px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="animate-fadeIn">
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-white/30 flex items-center justify-center animate-pulse">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Welcome back, {user.name}
                  </h1>
                  <p className="text-blue-100">Member since {new Date().getFullYear()}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order History Section */}
          <div className="animate-slideInLeft">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Sample order items - replace with actual order data */}
                  {[1, 2, 3].map((order) => (
                    <div
                      key={order}
                      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Order #{order}</span>
                        <span className="text-sm text-gray-500">Today</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Actions Section */}
          <div className="animate-slideInRight">
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Actions</h2>
                <div className="space-y-4">
                  <Button 
                    className="w-full justify-between hover:scale-105 transition-transform duration-200"
                    variant="outline"
                  >
                    Edit Profile
                    <Edit className="h-4 w-4 ml-2" />
                  </Button>

                  <Button 
                    className="w-full justify-between bg-primaryColor text-white hover:bg-hoverPrimaryColor hover:scale-105 transition-transform duration-200"
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Logout
                    <LogOut className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
