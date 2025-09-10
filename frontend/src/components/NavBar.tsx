import { useState, useEffect } from "react";
import { Search, User, ChevronDown, Sun, Moon, Monitor, Settings, List, LogOut, Menu, X, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface NavBarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean;
  isSidebarOpen?: boolean;
}

type Theme = "light" | "dark" | "system";

export function NavBar({
  currentPage,
  onPageChange,
  onToggleSidebar,
  showSidebarToggle = false,
  isSidebarOpen = false,
}: NavBarProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser] = useState({
    name: "John Adebayo",
    email: "john.adebayo@dclm.org",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "Member"
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = systemPrefersDark ? "dark" : "light";
      setTheme("system");
      applyTheme(initialTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemPrefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const getThemeIcon = (themeType: Theme) => {
    switch (themeType) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "system":
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };
  const navLinks = [
    { label: "Home", value: "home" },
    { label: "Videos", value: "videos" },
    { label: "Audios", value: "audios" },
    { label: "Admin", value: "admin" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-3 md:px-4 h-14 md:h-16 flex items-center justify-between">
        {/* Mobile: Sidebar Toggle */}
        {showSidebarToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-muted"
          >
            <Filter className="h-5 w-5" />
          </Button>
        )}

        {/* Logo */}
        <button 
          onClick={() => onPageChange("home")}
          className="flex items-center space-x-2 md:space-x-3 hover:opacity-80 transition-all duration-200 hover:scale-105 group"
          title="Go to Home"
        >
          <div className="relative">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-gradient-to-br from-[#003A7C] to-[#87CEFA] flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <div className="h-5 w-5 md:h-6 md:w-6 text-white font-bold text-xs md:text-sm flex items-center justify-center">
                ✟
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-base md:text-lg text-[#003A7C] dark:text-[#87CEFA] group-hover:text-[#87CEFA] dark:group-hover:text-[#FFC107] transition-colors">
              DCLM
            </span>
            <span className="text-xs text-muted-foreground font-medium group-hover:text-[#003A7C] dark:group-hover:text-[#87CEFA] transition-colors">
              Media Archive
            </span>
          </div>
        </button>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search sermons, series, or topics..."
              className="pl-10 bg-input-background"
            />
          </div>
        </div>

        {/* Mobile Search Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="md:hidden p-2 hover:bg-muted"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => onPageChange(link.value)}
              className={`transition-colors hover:text-primary ${
                currentPage === link.value
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}

          <Button variant="outline" className="border-[#FFC107] text-[#003A7C] hover:bg-[#FFC107] hover:text-white">
            Contact Us
          </Button>

          {/* Theme Toggle Buttons - Icons Only */}
          <div className="flex items-center bg-muted/30 rounded-lg p-1 border">
            <Button
              variant={theme === "light" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleThemeChange("light")}
              className={`h-8 w-8 p-0 ${
                theme === "light" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "hover:bg-muted text-muted-foreground"
              }`}
              title="Light theme"
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleThemeChange("dark")}
              className={`h-8 w-8 p-0 ${
                theme === "dark" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "hover:bg-muted text-muted-foreground"
              }`}
              title="Dark theme"
            >
              <Moon className="h-4 w-4" />
            </Button>
            <Button
              variant={theme === "system" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleThemeChange("system")}
              className={`h-8 w-8 p-0 ${
                theme === "system" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "hover:bg-muted text-muted-foreground"
              }`}
              title="Follow system theme"
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu & User Profile */}
        <div className="flex items-center space-x-2">
          {/* Mobile Theme Toggle */}
          <div className="lg:hidden flex items-center bg-muted/30 rounded-lg p-1 border">
            <Button
              variant={theme === "light" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleThemeChange("light")}
              className={`h-7 w-7 p-0 ${
                theme === "light" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "hover:bg-muted text-muted-foreground"
              }`}
              title="Light theme"
            >
              <Sun className="h-3 w-3" />
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleThemeChange("dark")}
              className={`h-7 w-7 p-0 ${
                theme === "dark" 
                  ? "bg-background text-foreground shadow-sm" 
                  : "hover:bg-muted text-muted-foreground"
              }`}
              title="Dark theme"
            >
              <Moon className="h-3 w-3" />
            </Button>
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 md:space-x-3 p-1 md:p-2 hover:bg-[#87CEFA]/10"
              >
                <Avatar className="h-7 w-7 md:h-8 md:w-8 ring-2 ring-[#003A7C]/20">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="bg-[#003A7C] text-white text-xs">
                    {currentUser.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-foreground">
                    {currentUser.name.split(" ")[0]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {currentUser.role}
                  </span>
                </div>
                <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="bg-[#003A7C] text-white">
                      {currentUser.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{currentUser.name}</span>
                    <span className="text-xs text-muted-foreground">{currentUser.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Mobile Navigation Links */}
              <div className="lg:hidden">
                {navLinks.map((link) => (
                  <DropdownMenuItem 
                    key={link.value}
                    onClick={() => {
                      onPageChange(link.value);
                      setIsMobileMenuOpen(false);
                    }}
                    className={currentPage === link.value ? "bg-muted" : ""}
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Contact Us
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
              
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <List className="mr-2 h-4 w-4" />
                My Playlists
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t border-border bg-background p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search sermons, series, or topics..."
              className="pl-10 bg-input-background"
              autoFocus
            />
          </div>
        </div>
      )}
    </nav>
  );
}