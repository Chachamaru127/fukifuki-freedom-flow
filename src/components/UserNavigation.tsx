
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, FileText, HelpCircle, Menu, X } from "lucide-react";

export function UserNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: "マイページ", href: "/mypage", icon: User },
    { title: "相談履歴", href: "/consultation", icon: FileText },
    { title: "ヘルプ", href: "/help", icon: HelpCircle },
  ];

  return (
    <nav className="bg-user-background border-b border-neutral-200 font-body shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-user-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-heading">F</span>
              </div>
              <span className="text-xl font-heading font-bold text-user-text">FUKIFUKI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? "bg-user-primary text-white"
                    : "text-user-text-secondary hover:text-user-primary hover:bg-user-background-alt"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
            <Link to="/login">
              <Button className="bg-user-primary hover:bg-user-primary/90 text-white rounded-lg">
                ログイン
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? "bg-user-primary text-white"
                      : "text-user-text-secondary hover:text-user-primary hover:bg-user-background-alt"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-user-primary hover:bg-user-primary/90 text-white rounded-lg mt-2">
                  ログイン
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
