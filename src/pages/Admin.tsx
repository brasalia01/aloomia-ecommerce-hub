import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  Users, 
  Package, 
  MessageSquare, 
  TrendingUp, 
  DollarSign,
  Eye,
  Settings,
  BarChart3,
  Shield
} from 'lucide-react';
import AdminProductsManager from '@/components/Admin/AdminProductsManager';
import AdminUsersManager from '@/components/Admin/AdminUsersManager';
import AdminOrdersManager from '@/components/Admin/AdminOrdersManager';
import AdminChatManager from '@/components/Admin/AdminChatManager';
import AdminAnalytics from '@/components/Admin/AdminAnalytics';

const Admin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    checkAdminAccess();
    loadDashboardStats();
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, email')
        .eq('id', user.id)
        .single();

      if (!profile || (profile.role !== 'admin' && profile.email !== 'admin@myshop.com')) {
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardStats = async () => {
    try {
      const [usersResult, ordersResult, productsResult, messagesResult] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id, total_amount, status', { count: 'exact' }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('chat_messages').select('id, read_by_admin', { count: 'exact' })
      ]);

      const totalRevenue = ordersResult.data?.reduce((sum, order) => {
        if (order.status === 'delivered' || order.status === 'processing') {
          return sum + parseFloat(order.total_amount.toString());
        }
        return sum;
      }, 0) || 0;

      const pendingOrders = ordersResult.data?.filter(order => 
        order.status === 'pending' || order.status === 'processing'
      ).length || 0;

      const unreadMessages = messagesResult.data?.filter(msg => 
        !msg.read_by_admin
      ).length || 0;

      setStats({
        totalUsers: usersResult.count || 0,
        totalOrders: ordersResult.count || 0,
        totalRevenue,
        totalProducts: productsResult.count || 0,
        pendingOrders,
        unreadMessages
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Revenue (GHS)',
      value: `₵${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b border-border/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Super Admin
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.email}
            </span>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
              {stats.unreadMessages > 0 && (
                <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                  {stats.unreadMessages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                              </p>
                              <p className="text-2xl font-bold text-foreground">
                                {stat.value}
                              </p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.bgColor}`}>
                              <IconComponent className={`w-6 h-6 ${stat.color}`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab('products')}
                    >
                      <Package className="w-6 h-6" />
                      <span>Add Product</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab('orders')}
                    >
                      <Eye className="w-6 h-6" />
                      <span>View Orders</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab('users')}
                    >
                      <Users className="w-6 h-6" />
                      <span>Manage Users</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab('chat')}
                    >
                      <MessageSquare className="w-6 h-6" />
                      <span>Support Chat</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="products">
            <AdminProductsManager onStatsUpdate={loadDashboardStats} />
          </TabsContent>

          <TabsContent value="orders">
            <AdminOrdersManager onStatsUpdate={loadDashboardStats} />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsersManager onStatsUpdate={loadDashboardStats} />
          </TabsContent>

          <TabsContent value="chat">
            <AdminChatManager onStatsUpdate={loadDashboardStats} />
          </TabsContent>

          <TabsContent value="analytics">
            <AdminAnalytics stats={stats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;