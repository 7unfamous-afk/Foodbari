import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  restaurantsList, 
  initialOrders, 
  initialAddresses, 
  initialPreferences, 
  initialNotificationSettings, 
  initialNotifications,
  DEFAULT_LOCATION 
} from '../data/userMockData';
import { useToast } from './ToastContext';

const AppContext = createContext();

export function AppProvider({ children }) {
  const { showToast } = useToast();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Location State (User's GPS or Default Location)
  const [userLocation, setUserLocation] = useState(() => {
    const saved = localStorage.getItem('foodbari_user_location');
    return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
  });

  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

  // Attempt browser geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Kathmandu, Nepal'
          };
          setUserLocation(newLoc);
          setLocationPermissionDenied(false);
        },
        (error) => {
          console.warn('Geolocation permission denied or error:', error.message);
          setLocationPermissionDenied(true);
        }
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('foodbari_user_location', JSON.stringify(userLocation));
  }, [userLocation]);

  // Restaurants State
  const [restaurants] = useState(restaurantsList);

  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('foodbari_favorites');
    return saved ? JSON.parse(saved) : ['burger-house', 'noodle-bowl', 'pizza-palace', 'spice-corner', 'himalayan-kitchen'];
  });

  // MULTI-RESTAURANT CART STATE (Array of Restaurant Groups)
  // Structure: [ { restaurantId, restaurantName, restaurantCuisine, restaurantImage, deliveryFee, minOrder, items: [...] } ]
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('foodbari_multi_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('foodbari_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Addresses State
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('foodbari_addresses');
    return saved ? JSON.parse(saved) : initialAddresses;
  });

  // Preferences & Settings State
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem('foodbari_preferences');
    return saved ? JSON.parse(saved) : initialPreferences;
  });

  const [notificationSettings, setNotificationSettings] = useState(() => {
    const saved = localStorage.getItem('foodbari_notif_settings');
    return saved ? JSON.parse(saved) : initialNotificationSettings;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('foodbari_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('foodbari_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('foodbari_multi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('foodbari_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('foodbari_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('foodbari_preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('foodbari_notif_settings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  useEffect(() => {
    localStorage.setItem('foodbari_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // FAVORITES LOGIC
  const toggleFavorite = (restaurantId) => {
    setFavorites(prev => {
      const exists = prev.includes(restaurantId);
      if (exists) {
        showToast('Removed from favorites', 'info');
        return prev.filter(id => id !== restaurantId);
      } else {
        showToast('Added to favorites!', 'success');
        return [...prev, restaurantId];
      }
    });
  };

  // MULTI-RESTAURANT CART LOGIC
  const addToCart = (item, restaurant, customization = {}, quantity = 1) => {
    let unitPrice = item.price;
    if (customization.size && customization.size.price) {
      unitPrice += customization.size.price;
    }
    if (customization.extras && Array.isArray(customization.extras)) {
      customization.extras.forEach(extra => {
        unitPrice += extra.price || 0;
      });
    }

    setCart(prevCart => {
      const updatedCart = [...prevCart];
      let groupIndex = updatedCart.findIndex(g => g.restaurantId === restaurant.id);

      if (groupIndex === -1) {
        // Create new restaurant group
        updatedCart.push({
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          restaurantCuisine: restaurant.cuisine,
          restaurantImage: restaurant.image,
          deliveryFee: restaurant.deliveryFee || 0,
          minOrder: restaurant.minOrder || 0,
          items: [{
            id: `${item.id}-${Date.now()}`,
            itemId: item.id,
            name: item.name,
            image: item.image,
            unitPrice,
            totalPrice: unitPrice * quantity,
            quantity,
            customization
          }]
        });
      } else {
        // Group exists, check if exact item exists
        const group = { ...updatedCart[groupIndex] };
        const items = [...group.items];
        const itemIndex = items.findIndex(i => i.itemId === item.id);

        if (itemIndex > -1) {
          const existingItem = { ...items[itemIndex] };
          const newQty = existingItem.quantity + quantity;
          existingItem.quantity = newQty;
          existingItem.totalPrice = existingItem.unitPrice * newQty;
          items[itemIndex] = existingItem;
        } else {
          items.push({
            id: `${item.id}-${Date.now()}`,
            itemId: item.id,
            name: item.name,
            image: item.image,
            unitPrice,
            totalPrice: unitPrice * quantity,
            quantity,
            customization
          });
        }
        group.items = items;
        updatedCart[groupIndex] = group;
      }

      return updatedCart;
    });

    showToast(`Added ${quantity} x ${item.name} to cart!`, 'success');
    return true;
  };

  const updateCartQuantity = (restaurantId, itemIndex, delta) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const groupIndex = updatedCart.findIndex(g => g.restaurantId === restaurantId);
      if (groupIndex === -1) return prevCart;

      const group = { ...updatedCart[groupIndex] };
      const items = [...group.items];
      const targetItem = { ...items[itemIndex] };

      const newQty = targetItem.quantity + delta;
      if (newQty <= 0) {
        items.splice(itemIndex, 1);
        showToast('Item removed from cart', 'info');
      } else {
        targetItem.quantity = newQty;
        targetItem.totalPrice = targetItem.unitPrice * newQty;
        items[itemIndex] = targetItem;
      }

      if (items.length === 0) {
        updatedCart.splice(groupIndex, 1);
      } else {
        group.items = items;
        updatedCart[groupIndex] = group;
      }

      return updatedCart;
    });
  };

  const removeFromCart = (restaurantId, itemIndex) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const groupIndex = updatedCart.findIndex(g => g.restaurantId === restaurantId);
      if (groupIndex === -1) return prevCart;

      const group = { ...updatedCart[groupIndex] };
      group.items = group.items.filter((_, i) => i !== itemIndex);

      if (group.items.length === 0) {
        updatedCart.splice(groupIndex, 1);
      } else {
        updatedCart[groupIndex] = group;
      }

      showToast('Item removed from cart', 'info');
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // MULTI-RESTAURANT CART CALCULATIONS
  const totalFoodItemsCount = cart.reduce((total, group) => {
    return total + group.items.reduce((sum, item) => sum + item.quantity, 0);
  }, 0);

  const cartSubtotal = cart.reduce((total, group) => {
    return total + group.items.reduce((sum, item) => sum + item.totalPrice, 0);
  }, 0);

  const deliveryFeesBreakdown = cart.map(group => ({
    restaurantId: group.restaurantId,
    restaurantName: group.restaurantName,
    deliveryFee: group.deliveryFee || 0
  }));

  const totalDeliveryFees = deliveryFeesBreakdown.reduce((sum, df) => sum + df.deliveryFee, 0);
  const cartDiscount = 0;
  const cartTotal = cartSubtotal + totalDeliveryFees - cartDiscount;

  const minOrderStatuses = cart.map(group => {
    const groupSubtotal = group.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const minOrder = group.minOrder || 0;
    const meetsMinOrder = groupSubtotal >= minOrder;
    return {
      restaurantId: group.restaurantId,
      restaurantName: group.restaurantName,
      minOrder,
      subtotal: groupSubtotal,
      meetsMinOrder,
      amountNeeded: meetsMinOrder ? 0 : minOrder - groupSubtotal
    };
  });

  const allMinOrdersMet = minOrderStatuses.every(s => s.meetsMinOrder);

  // ORDERS LOGIC
  const placeOrder = ({ deliveryAddress, paymentMethod = 'Cash on Delivery' }) => {
    if (cart.length === 0) return null;

    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const restaurantOrders = cart.map(group => ({
      restaurantId: group.restaurantId,
      restaurantName: group.restaurantName,
      restaurantCuisine: group.restaurantCuisine,
      restaurantImage: group.restaurantImage,
      status: 'Preparing',
      items: group.items
    }));

    const newOrder = {
      id: newOrderId,
      date: dateStr,
      time: timeStr,
      location: typeof deliveryAddress === 'object' ? deliveryAddress.fullAddress : deliveryAddress,
      deliveryAddress: typeof deliveryAddress === 'object' ? `${deliveryAddress.label}: ${deliveryAddress.fullAddress}` : deliveryAddress,
      paymentMethod,
      subtotal: cartSubtotal,
      deliveryFee: totalDeliveryFees,
      discount: cartDiscount,
      totalAmount: cartTotal,
      estimatedDeliveryTime: '30-40 mins',
      restaurantOrders
    };

    setOrders(prev => [newOrder, ...prev]);

    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Combined Order Placed!',
      message: `Your order ${newOrderId} from ${cart.length} restaurant(s) is being prepared.`,
      time: 'Just now',
      read: false,
      type: 'order',
      orderId: newOrderId
    };
    setNotifications(prev => [newNotif, ...prev]);

    clearCart();
    showToast('Multi-restaurant order placed successfully!', 'success');
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedRestOrders = order.restaurantOrders ? order.restaurantOrders.map(ro => ({ ...ro, status: 'Cancelled' })) : [];
        return { ...order, status: 'Cancelled', restaurantOrders: updatedRestOrders };
      }
      return order;
    }));
    showToast('Order cancelled', 'info');
  };

  const reorder = (order) => {
    clearCart();
    if (order.restaurantOrders) {
      order.restaurantOrders.forEach(group => {
        const matchingRestaurant = restaurants.find(r => r.id === group.restaurantId) || {
          id: group.restaurantId,
          name: group.restaurantName,
          cuisine: group.restaurantCuisine,
          image: group.restaurantImage,
          deliveryFee: 0,
          minOrder: 0
        };

        group.items.forEach(item => {
          addToCart(item, matchingRestaurant, item.customization || {}, item.quantity || 1);
        });
      });
    }
    showToast('Reordered items added to cart!', 'success');
  };

  // ADDRESSES LOGIC
  const addAddress = (addressData) => {
    const newAddr = {
      id: `addr-${Date.now()}`,
      ...addressData,
      isDefault: addresses.length === 0 ? true : Boolean(addressData.isDefault)
    };

    if (newAddr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses(prev => [...prev, newAddr]);
    }

    showToast('Address saved successfully!', 'success');
  };

  const editAddress = (id, updatedData) => {
    setAddresses(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, ...updatedData };
      }
      if (updatedData.isDefault) {
        return { ...a, isDefault: false };
      }
      return a;
    }));
    showToast('Address updated!', 'success');
  };

  const deleteAddress = (id) => {
    setAddresses(prev => {
      const filtered = prev.filter(a => a.id !== id);
      if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
    showToast('Address deleted', 'info');
  };

  const setDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({
      ...a,
      isDefault: a.id === id
    })));

    const selectedAddr = addresses.find(a => a.id === id);
    if (selectedAddr && selectedAddr.coordinates) {
      setUserLocation({
        lat: selectedAddr.coordinates.lat,
        lng: selectedAddr.coordinates.lng,
        address: selectedAddr.fullAddress
      });
    }
    showToast('Default delivery address updated!', 'success');
  };

  // PREFERENCES & NOTIFICATION SETTINGS
  const updatePreferences = (newPrefs) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
    showToast('Preferences updated', 'success');
  };

  const updateNotificationSettings = (newSettings) => {
    setNotificationSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Notification settings updated', 'success');
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      searchQuery,
      setSearchQuery,
      userLocation,
      setUserLocation,
      locationPermissionDenied,
      restaurants,
      favorites,
      toggleFavorite,
      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      totalFoodItemsCount,
      cartSubtotal,
      deliveryFeesBreakdown,
      totalDeliveryFees,
      cartDiscount,
      cartTotal,
      minOrderStatuses,
      allMinOrdersMet,
      orders,
      placeOrder,
      cancelOrder,
      reorder,
      addresses,
      addAddress,
      editAddress,
      deleteAddress,
      setDefaultAddress,
      preferences,
      updatePreferences,
      notificationSettings,
      updateNotificationSettings,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      unreadNotifCount
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useUserApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useUserApp must be used within an AppProvider');
  }
  return context;
}
