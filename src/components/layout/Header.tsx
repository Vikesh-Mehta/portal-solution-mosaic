
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = user ? [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Health Checkup', href: '/health-checkup' },
    { name: 'Virtual Consultation', href: '/virtual-consultation' },
    { name: 'Medicine Advisor', href: '/medicine-advisor' },
    { name: 'Profile', href: '/profile' },
  ] : [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border z-50 dark:bg-gray-900/95">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">Smart Health</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-medical-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-medical-400"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-medical-600"
              />
              <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-600 hover:text-medical-600 transition-colors dark:text-gray-300 dark:hover:text-medical-400"
                >
                  <User size={20} />
                  <span className="font-medium">Profile</span>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-medical-600 hover:bg-medical-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-white dark:bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-600 hover:text-medical-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-medical-400"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Dark Mode Toggle */}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-gray-600 dark:text-gray-300 font-medium">Dark Mode</span>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                    className="data-[state=checked]:bg-medical-600"
                  />
                  <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </div>
              </div>
              
              {user ? (
                <div className="border-t border-border pt-2 mt-2 dark:border-gray-700">
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-medical-600 transition-colors dark:text-gray-300 dark:hover:text-medical-400"
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-medical-600 transition-colors w-full text-left dark:text-gray-300 dark:hover:text-medical-400"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-border pt-2 mt-2 space-y-2 dark:border-gray-700">
                  <Link
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2"
                  >
                    <Button size="sm" className="w-full bg-medical-600 hover:bg-medical-700">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
