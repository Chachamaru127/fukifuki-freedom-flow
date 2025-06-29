
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  Shield
} from "lucide-react";

export function AdminNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: "ダッシュボード", href: "/admin/dashboard", icon: LayoutDashboard },
    { title: "案件管理", href: "/admin/cases", icon: FolderOpen },
    { title: "分析レポート", href: "/admin/analytics", icon: BarChart3 },
    { title: "システム設定", href: "/admin/settings", icon: Settings },
  ];

  return (
    <nav className="bg-admin-sidebar border-b border-admin-primary font-body shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-admin-secondary rounded-lg flex items-center justify-center">
                <Shield className="text-white h-4 w-4" />
              </div>
              <span className="text-xl font-heading font-bold text-admin-text-light">FUKIFUKI Admin</span>
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
                    ? "bg-admin-secondary text-white"
                    : "text-admin-text-light/70 hover:text-admin-text-light hover:bg-admin-primary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-admin-primary">
              <span className="text-admin-text-light/70 text-sm">管理者</span>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-admin-text-light/70 hover:text-admin-text-light hover:bg-admin-primary"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-admin-text-light"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-admin-primary py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? "bg-admin-secondary text-white"
                      : "text-admin-text-light/70 hover:text-admin-text-light hover:bg-admin-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
              <div className="border-t border-admin-primary pt-2 mt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start text-admin-text-light/70 hover:text-admin-text-light hover:bg-admin-primary"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  ログアウト
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
