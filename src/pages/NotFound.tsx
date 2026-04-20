
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";

const NotFound = () => {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div 
      className={`min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat ${
        theme === 'dark' ? 'bg-black/50' : 'bg-white/50'
      }`}
      style={{ 
        backgroundImage: 'url("/lovable-uploads/64bf3f4b-fc78-489a-8ff5-4ec2e9fe9032.png")',
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="text-center space-y-8">
        <img 
          src="/lovable-uploads/70245805-0d4d-40c4-a0fd-3bb7a89fe469.png" 
          alt="Logo" 
          className="h-12 mx-auto mb-8"
        />
        <h1 className={`text-4xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Oops! Seems like someone got lost...
        </h1>
        <h2 className={`text-xl ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Don't worry, we've got your back.
        </h2>
        <div className="mt-12">
          <Link to="/dashboard">
            <Button 
              className={`${
                theme === 'dark' 
                  ? 'bg-black/30 backdrop-blur-sm border border-white/10 text-white hover:bg-coompass-success hover:border-transparent' 
                  : 'bg-white/30 backdrop-blur-sm border border-black/10 text-gray-900 hover:bg-coompass-success hover:border-transparent hover:text-white'
              } transition-all duration-300`}
            >
              <Home className="mr-2 h-4 w-4" />
              Jump to your dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
