import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChangePassword } from '@/components/Profile/ChangePassword';
import { NotificationCenter } from '@/components/Notifications/NotificationCenter';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Calendar, Settings, ShoppingBag, Heart, MapPin, Phone, Edit2, Save } from 'lucide-react';

export default function Profile() {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
    address: '',
    profile_meta: {}
  });

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        full_name: userProfile.full_name || '',
        phone: userProfile.profile_meta?.phone || '',
        address: userProfile.profile_meta?.address || '',
        profile_meta: userProfile.profile_meta || {}
      });
    }
    loadUserData();
  }, [userProfile]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      // Load orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (title, images)
          )
        `)
        .eq('user_id', user.id)
        .order('placed_at', { ascending: false });
      
      setOrders(ordersData || []);

      // Load favorites
      const { data: favoritesData } = await supabase
        .from('favorites')
        .select(`
          *,
          products (*)
        `)
        .eq('user_id', user.id);
      
      setFavorites(favoritesData || []);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          profile_meta: {
            ...profileData.profile_meta,
            phone: profileData.phone,
            address: profileData.address
          }
        })
        .eq('id', user.id);

      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      setEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'payment_pending': return 'bg-orange-100 text-orange-800';
      case 'payment_failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {profileData.full_name || 'User'}</h1>
                <p className="text-muted-foreground">Manage your account and track your orders</p>
              </div>
            </div>
            <NotificationCenter />
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="favorites">Wishlist</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editing ? updateProfile() : setEditing(true)}
                      disabled={loading}
                    >
                      {editing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{user.email}</span>
                        <Badge variant="outline" className="text-xs">Verified</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="joinDate">Member Since</Label>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{new Date(user.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      {editing ? (
                        <Input
                          id="fullName"
                          value={profileData.full_name}
                          onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <div className="flex items-center space-x-3">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{profileData.full_name || 'Not provided'}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {editing ? (
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{profileData.phone || 'Not provided'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    {editing ? (
                      <Textarea
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        placeholder="Enter your address"
                        rows={3}
                      />
                    ) : (
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                        <span className="text-sm">{profileData.address || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Order History</span>
                  </CardTitle>
                  <CardDescription>
                    Track your recent orders and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                      <Button onClick={() => window.location.href = '/products'}>
                        Browse Products
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order: any) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">Order #{order.id.slice(0, 8)}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.placed_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getOrderStatusColor(order.status)}>
                                {order.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                              <p className="text-sm font-semibold mt-1">
                                GH₵ {order.total_amount}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {order.order_items?.map((item: any) => (
                              <div key={item.id} className="flex items-center space-x-3 text-sm">
                                <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                  {item.products?.images?.[0] ? (
                                    <img 
                                      src={item.products.images[0]} 
                                      alt={item.products.title}
                                      className="w-full h-full object-cover rounded"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-muted-foreground/20 rounded" />
                                  )}
                                </div>
                                <span className="flex-1">{item.products?.title}</span>
                                <span>Qty: {item.quantity}</span>
                                <span>GH₵ {item.total_price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </CardTitle>
                  <CardDescription>
                    Products you've saved for later
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favorites.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                      <p className="text-muted-foreground mb-4">Save products you love to your wishlist</p>
                      <Button onClick={() => window.location.href = '/products'}>
                        Browse Products
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favorites.map((favorite: any) => (
                        <div key={favorite.id} className="border rounded-lg p-4">
                          <div className="aspect-square bg-muted rounded-lg mb-3">
                            {favorite.products?.images?.[0] && (
                              <img 
                                src={favorite.products.images[0]} 
                                alt={favorite.products.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            )}
                          </div>
                          <h4 className="font-semibold mb-1">{favorite.products?.title}</h4>
                          <p className="text-lg font-bold text-primary">
                            GH₵ {favorite.products?.price}
                          </p>
                          <Button size="sm" className="w-full mt-3">
                            Add to Cart
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <ChangePassword />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Account Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Role</p>
                      <p className="text-sm text-muted-foreground">Your account permissions</p>
                    </div>
                    <Badge variant={userProfile?.role === 'admin' ? 'default' : 'secondary'}>
                      {userProfile?.role || 'customer'}
                    </Badge>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button onClick={() => window.location.href = '/auth'} variant="outline" className="w-full">
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}