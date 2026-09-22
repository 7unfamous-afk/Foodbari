import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { calculateDistance } from '../../utils/locationUtils';
import { Navigation } from 'lucide-react';

export default function RestaurantMap({ 
  userLocation, 
  restaurants = [], 
  selectedRestaurantId = null,
  onRestaurantSelect 
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize Leaflet map if not already created
    if (!mapInstanceRef.current) {
      const initialLat = userLocation?.lat || 27.6710;
      const initialLng = userLocation?.lng || 85.3218;

      const map = L.map(mapRef.current, {
        center: [initialLat, initialLng],
        zoom: 14,
        zoomControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add zoom control at top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];

    // Add User Location Marker
    if (userLocation && userLocation.lat && userLocation.lng) {
      const userIcon = L.divIcon({
        className: 'custom-user-pin',
        html: `
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping"></span>
            <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[9px] font-extrabold">
              YOU
            </div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; padding: 2px; text-align: center;">
            <b style="color: #2563EB;">Your Location</b><br/>
            <span style="font-size: 11px; color: #64748B;">${userLocation.address || 'Kathmandu, Nepal'}</span>
          </div>
        `);

      markersRef.current.push(userMarker);
    }

    // Add Restaurant Markers
    restaurants.forEach((r) => {
      if (!r.coordinates || !r.coordinates.lat || !r.coordinates.lng) return;

      const isSelected = selectedRestaurantId === r.id;
      const dist = calculateDistance(
        userLocation?.lat || 27.6710,
        userLocation?.lng || 85.3218,
        r.coordinates.lat,
        r.coordinates.lng
      );

      const restaurantIcon = L.divIcon({
        className: 'custom-restaurant-pin',
        html: `
          <div style="
            background-color: ${isSelected ? '#1e293b' : '#FF6500'};
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            border: 2px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            font-size: 11px;
            font-weight: 800;
            display: flex;
            items-center;
            gap: 4px;
            transform: scale(${isSelected ? '1.15' : '1'});
            transition: all 0.2s ease;
            white-space: nowrap;
          ">
            <span>🍕</span>
            <span>${r.name.split(' ')[0]}</span>
          </div>
        `,
        iconSize: [80, 26],
        iconAnchor: [40, 13]
      });

      const marker = L.marker([r.coordinates.lat, r.coordinates.lng], { icon: restaurantIcon })
        .addTo(map);

      // Custom Popup HTML
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 font-sans space-y-2 min-w-[180px]';
      popupContent.innerHTML = `
        <div style="font-weight: 800; font-size: 13px; color: #0f172a;">${r.name}</div>
        <div style="font-size: 11px; color: #64748B; margin-top: 2px;">
          <span style="color: #F59E0B; font-weight: 800;">★ ${r.rating}</span> • ${r.cuisine}
        </div>
        <div style="font-size: 11px; color: #475569; margin-top: 4px; font-weight: 600;">
          ⏱ ${r.deliveryTime} ${dist ? `• ${dist} km` : ''}
        </div>
        <div style="font-size: 10px; color: #059669; font-weight: 700; margin-top: 2px;">
          ${r.freeDelivery ? 'Free Delivery' : `Fee: Rs. ${r.deliveryFee}`} • Rs. ${r.minOrder} min
        </div>
        <button id="view-btn-${r.id}" style="
          margin-top: 8px;
          width: 100%;
          background-color: #FF6500;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        ">
          View Restaurant →
        </button>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        if (onRestaurantSelect) onRestaurantSelect(r.id);
        setTimeout(() => {
          const btn = document.getElementById(`view-btn-${r.id}`);
          if (btn) {
            btn.onclick = () => navigate(`/restaurants/${r.id}`);
          }
        }, 50);
      });

      markersRef.current.push(marker);

      // If this restaurant is currently selected, center map on it
      if (isSelected) {
        map.setView([r.coordinates.lat, r.coordinates.lng], 15, { animate: true });
        marker.openPopup();
      }
    });

  }, [userLocation, restaurants, selectedRestaurantId, navigate, onRestaurantSelect]);

  const handleCenterUser = () => {
    if (mapInstanceRef.current && userLocation?.lat && userLocation?.lng) {
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 14, { animate: true });
    }
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
      <div ref={mapRef} className="w-full h-full z-10" />

      {/* Center My Location Button Overlay */}
      <button
        type="button"
        onClick={handleCenterUser}
        title="Center Map on My Location"
        className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-white text-slate-800 shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-200 cursor-pointer"
      >
        <Navigation size={16} className="text-[#FF6500]" />
      </button>
    </div>
  );
}
