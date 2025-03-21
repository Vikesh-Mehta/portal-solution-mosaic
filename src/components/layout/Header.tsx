
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell, Moon, Sun } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Health Checkup', path: '/health-checkup' },
    { name: 'Virtual Doctor', path: '/virtual-consultation' },
    { name: 'Medicine Advisor', path: '/medicine-advisor' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 glass dark:glass-dark shadow-sm' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-medical-500 to-healing-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">SH</span>
            </div>
            <span className="text-xl font-medium">Smart Health</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-medical-600 ${
                  location.pathname === link.path
                    ? 'text-medical-600 dark:text-medical-400'
                    : 'text-foreground/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="p-2 rounded-full hover:bg-accent transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <Link 
              to="/profile" 
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Profile"
            >
              <User size={20} />
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-accent/80 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass dark:glass-dark shadow-md animate-fade-in">
          <div className="py-4 px-6 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-medical-600 ${
                    location.pathname === link.path
                      ? 'text-medical-600 dark:text-medical-400'
                      : 'text-foreground/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/profile"
                className="text-sm font-medium transition-colors hover:text-medical-600"
              >
                My Profile
              </Link>
            </nav>
            <div className="flex items-center space-x-4 pt-2 border-t border-border">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-accent/80 transition-colors flex items-center space-x-2"
              >
                {isDarkMode ? (
                  <>
                    <Sun size={18} />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={18} />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
