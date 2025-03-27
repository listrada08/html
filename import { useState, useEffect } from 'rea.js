import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, BarChart2, PieChart, RefreshCw, Wallet, Settings, LogOut } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <BarChart2 className="w-4 h-4 mr-2" /> },
    { name: 'Portfolio', path: '/portfolio', icon: <PieChart className="w-4 h-4 mr-2" /> },
    { name: 'Transactions', path: '/transactions', icon: <RefreshCw className="w-4 h-4 mr-2" /> },
    { name: 'Wallets', path: '/wallets', icon: <Wallet className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold">WP</span>
              </div>
              <span className="font-semibold text-lg hidden md:inline-block">
                WealthPilot
              </span>
            </NavLink>
          </div>

          {!isMobile ? (
            <nav className="hidden md:flex space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                    flex items-center
                    ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}
            </nav>
          ) : null}

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden md:flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[260px] sm:w-[300px]">
                  <div className="flex flex-col h-full">
                    <div className="py-6">
                      <div className="flex items-center space-x-2 mb-6">
                        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                          <span className="text-white font-bold">WP</span>
                        </div>
                        <span className="font-semibold text-lg">
                          WealthPilot
                        </span>
                      </div>
                      <nav className="flex flex-col space-y-1">
                        {navLinks.map((link) => (
                          <SheetClose asChild key={link.path}>
                            <NavLink
                              to={link.path}
                              className={({ isActive }) => `
                                px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200
                                flex items-center
                                ${
                                  isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }
                              `}
                            >
                              {link.icon}
                              {link.name}
                            </NavLink>
                          </SheetClose>
                        ))}
                      </nav>
                    </div>
                    <div className="mt-auto">
                      <SheetClose asChild>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start mb-2"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-gray-600"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Log Out
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
