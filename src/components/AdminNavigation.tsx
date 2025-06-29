
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, PieChart, Settings, LogOut, User, Menu, X } from "lucide-react";

export function AdminNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: "ダッシュボード", href: "/admin/dashboard", icon: BarChart3 },
    { title: "案件管理", href: "/admin/cases", icon: FileText },
    { title: "分析", href: "/admin/analytics", icon: PieChart },
    { title: "設定", href: "/admin/settings", icon: Settings },
  ];

  return (
    <nav className="bg-admin-background border-b border-admin-surface font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-admin-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-heading">F</span>
              </div>
              <span className="text-xl font-heading font-bold text-admin-text">FUKIFUKI Admin</span>
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
                    ? "bg-admin-primary text-white"
                    : "text-admin-text-secondary hover:text-admin-text hover:bg-admin-background-alt"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
            
            {/* Admin user info */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-admin-secondary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-admin-text">管理者</span>
              <Button variant="ghost" size="sm" className="text-admin-text-secondary hover:text-admin-text">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-admin-text"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-admin-surface py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? "bg-admin-primary text-white"
                      : "text-admin-text-secondary hover:text-admin-text hover:bg-admin-background-alt"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
