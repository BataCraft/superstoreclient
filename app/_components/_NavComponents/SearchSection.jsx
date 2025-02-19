import Link from "next/link";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useAuthStore from "@/Store/userStore";
import LoadingPage from "@/components/Custom/Loader";
import NavCart from "./NavCart";
import { useEffect } from "react";

const SearchSection = () => {
  const { user, loading, checkAuth } = useAuthStore(); // Get user, loading, and checkAuth from store
  const router = useRouter();

  // Prevent accessing user._id when user is null
  const userId = user ? user._id : null;
  // console.log(userId);
  

  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  const handleProfileClick = () => {
    if (userId) {
      router.push(`/account/${userId}`);
    } else {
      router.push("/auth/login");
    }
    
  };

  // On page load or refresh, check if user is authenticated
  useEffect(() => {
    // Check if the user is authenticated using the checkAuth function
    checkAuth();
  }, [checkAuth]);

  // Show loading page while checking auth or if loading
  if (loading) return <div><LoadingPage /></div>;

  // If the user is logged in, they will see the profile button
  return (
    <nav className="container mx-auto px-4 mt-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            SUPERSTORE<span className="text-4xl text-[#df4949]">.</span>
          </h1>
        </Link>

        <div>
          <div className="flex items-center gap-8">
            <div className="hidden sm:block">
              <SearchBar />
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <Button onClick={handleProfileClick}>
                <p className="text-gray-400">Need </p><span className="text-black font-semibold">Help?</span>
              </Button>
              {user ? (
                <Button onClick={handleProfileClick}>
                  <p className="text-gray-400">Your </p><span className="text-black font-semibold">Profile</span>
                </Button>
              ) : (
                <Button onClick={handleLoginClick}>
                  <p className="text-gray-400">Your </p><span className="text-black font-semibold">Account</span>
                </Button>
              )}
            </div>

            <div>
              <NavCart />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SearchSection;
