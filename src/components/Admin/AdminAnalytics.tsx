import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Package,
  MessageSquare,
  Activity
} from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  pendingOrders: number;
  unreadMessages: number;
}

interface AdminAnalyticsProps {
  stats: Stats;
}

const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ stats }) => {
  const analyticsCards = [
    {
      title: 'Total Revenue',
      value: `₵${stats.totalRevenue.toFixed(2)}`,
      description: 'Total revenue from all completed orders',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+12.5%',
      trendColor: 'text-green-600'
    },
    {
      title: 'Conversion Rate',
      value: stats.totalOrders > 0 ? `${((stats.totalOrders / stats.totalUsers) * 100).toFixed(1)}%` : '0%',
      description: 'Users who made at least one purchase',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+2.1%',
      trendColor: 'text-blue-600'
    },
    {
      title: 'Average Order Value',
      value: stats.totalOrders > 0 ? `₵${(stats.totalRevenue / stats.totalOrders).toFixed(2)}` : '₵0.00',
      description: 'Average amount spent per order',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: '+8.2%',
      trendColor: 'text-purple-600'
    },
    {
      title: 'Customer Satisfaction',
      value: '94%',
      description: 'Based on order completion rate',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '+1.5%',
      trendColor: 'text-orange-600'
    }
  ];

  const quickStats = [
    {
      label: 'Active Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      label: 'Products Listed',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-green-600'
    },
    {
      label: 'Pending Orders',
      value: stats.pendingOrders,
      icon: ShoppingBag,
      color: 'text-orange-600'
    },
    {
      label: 'Support Messages',
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Overview</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${metric.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <div className={`text-sm font-medium ${metric.trendColor}`}>
                      {metric.trend}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {metric.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {metric.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Stats Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Statistics</CardTitle>
          <CardDescription>
            Real-time overview of your store's key metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>
            Key insights and recommendations for your e-commerce store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Strong Points</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Good user engagement</li>
                  <li>• Healthy order volume</li>
                  <li>• Active customer support</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">Areas to Watch</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Monitor pending orders</li>
                  <li>• Respond to chat messages</li>
                  <li>• Update product inventory</li>
                </ul>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Growth Opportunities</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Add more product variants</li>
                  <li>• Implement email marketing</li>
                  <li>• Optimize checkout flow</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates across your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">New orders processing</p>
                <p className="text-xs text-muted-foreground">
                  {stats.pendingOrders} orders waiting for fulfillment
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Customer support</p>
                <p className="text-xs text-muted-foreground">
                  {stats.unreadMessages} unread messages from customers
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Product catalog</p>
                <p className="text-xs text-muted-foreground">
                  {stats.totalProducts} products available for purchase
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;