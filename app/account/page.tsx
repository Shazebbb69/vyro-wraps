"use client"

import * as React from "react"
import { Package, User, MapPin, Heart, LogOut } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userProfileData, orderHistoryData } from "@/data/mock"

type Tab = "dashboard" | "orders" | "addresses" | "profile" | "wishlist"

export default function AccountPage() {
  const [activeTab, setActiveTab] = React.useState<Tab>("dashboard")

  const handleLogout = () => {
    window.location.href = "/login"
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-6 border-b border-border/50">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold font-heading uppercase tracking-wider mb-2">
              My <span className="text-primary">Account</span>
            </h1>
            <p className="text-muted-foreground font-medium">Welcome back, {userProfileData.firstName}!</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 gap-2" onClick={handleLogout}>
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-5 h-5" /> Dashboard
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Package className="w-5 h-5" /> Orders
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "profile" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-5 h-5" /> Profile Details
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "addresses" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <MapPin className="w-5 h-5" /> Addresses
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === "wishlist" ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className="w-5 h-5" /> Wishlist
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            {activeTab === "dashboard" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold font-heading uppercase tracking-wide">Account Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="bg-secondary p-6 rounded-sm border border-border">
                    <Package className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-1">Total Orders</h3>
                    <p className="text-3xl font-mono text-muted-foreground">{orderHistoryData.length}</p>
                  </div>
                  <div className="bg-secondary p-6 rounded-sm border border-border">
                    <MapPin className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-1">Saved Addresses</h3>
                    <p className="text-3xl font-mono text-muted-foreground">1</p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <h3 className="text-xl font-bold font-heading uppercase tracking-wide mb-6">Recent Order</h3>
                  {orderHistoryData.slice(0, 1).map((order) => (
                    <div key={order.id} className="bg-secondary p-6 rounded-sm border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">Order #{order.id}</p>
                        <p className="font-bold">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">Status</p>
                        <p className={`font-bold ${order.status === "Delivered" ? "text-success" : "text-primary"}`}>{order.status}</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-muted-foreground">Total</p>
                        <p className="font-bold font-mono">₹{order.total}</p>
                      </div>
                      <Button variant="outline" onClick={() => setActiveTab("orders")}>View Details</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold font-heading uppercase tracking-wide mb-6">Order History</h2>
                {orderHistoryData.map((order) => (
                  <div key={order.id} className="bg-secondary p-6 rounded-sm border border-border space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/50 pb-4">
                      <div>
                        <p className="font-bold text-lg">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${order.status === "Delivered" ? "text-success" : "text-primary"}`}>{order.status}</p>
                        <p className="font-bold font-mono">Total: ₹{order.total}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-background rounded-sm border border-border overflow-hidden shrink-0">
                             <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(https://placehold.co/100x100/1A1A1A/FFFFFF?text=Wrap)` }} />
                          </div>
                          <div>
                            <Link href="/product" className="font-bold hover:text-primary transition-colors">{item.name}</Link>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 flex gap-4">
                      <Button variant="outline">Track Order</Button>
                      <Button variant="outline">Invoice</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
                <h2 className="text-2xl font-bold font-heading uppercase tracking-wide">Profile Details</h2>
                <form className="space-y-6 bg-secondary p-8 rounded-sm border border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input defaultValue={userProfileData.firstName} className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input defaultValue={userProfileData.lastName} className="bg-background" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input defaultValue={userProfileData.email} type="email" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input defaultValue={userProfileData.phone} type="tel" className="bg-background" />
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <h3 className="text-lg font-bold mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <Input type="password" placeholder="Current Password" className="bg-background" />
                      <Input type="password" placeholder="New Password" className="bg-background" />
                      <Input type="password" placeholder="Confirm New Password" className="bg-background" />
                    </div>
                  </div>
                  
                  <Button type="button" size="lg" className="mt-4">Save Changes</Button>
                </form>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold font-heading uppercase tracking-wide">Saved Addresses</h2>
                  <Button>Add New Address</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-secondary p-6 rounded-sm border border-primary/50 relative">
                    <div className="absolute top-4 right-4 text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded-sm uppercase tracking-wider">Default</div>
                    <h3 className="font-bold text-lg mb-2">{userProfileData.firstName} {userProfileData.lastName}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      123 Fitness Hub, Sector 45<br />
                      Gurugram, Haryana 122003<br />
                      India<br />
                      Phone: {userProfileData.phone}
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">Delete</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-12">
                <div className="w-20 h-20 bg-secondary flex items-center justify-center rounded-full mx-auto mb-6 text-muted-foreground">
                  <Heart className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold font-heading uppercase tracking-wide">Your Wishlist is Empty</h2>
                <p className="text-muted-foreground mb-8">Save items you love to your wishlist to easily find them later.</p>
                <Link href="/product">
                  <Button size="lg">Discover Products</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
