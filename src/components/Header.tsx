import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, BookOpen } from "lucide-react";
import AppLogo from "./AppLogo";
import ThemeAndLanguageSwitcher from "./ThemeAndLanguageSwitcher";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
export default function Header() {
  const {
    user,
    signOut,
    isSigningOut
  } = useAuth();
  const {
    toast
  } = useToast();
  const handleSignOut = async () => {
    if (isSigningOut) return; // Prevent multiple clicks
    
    const {
      error
    } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully"
      });
    }
  };
  return <header className="w-full bg-white/70 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <AppLogo />
        
        {user && <nav className="hidden md:flex items-center gap-6">
            
            
          </nav>}

        <div className="flex items-center gap-3">
          {user && <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full">
                <User className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-indigo-700 hidden sm:inline">
                  {user.email}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut} 
                disabled={isSigningOut}
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 disabled:opacity-50"
              >
                <LogOut className="w-4 h-4 mr-1" />
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </Button>
            </div>}
          <ThemeAndLanguageSwitcher />
        </div>
      </div>
    </header>;
}