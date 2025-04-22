
import React, { useEffect } from 'react';
import { Club } from '@/types/club';
import dynamic from 'react-dynamic-import';
import './ClubsMap.css';

const ClubsMapView = dynamic(() => import('./ClubsMapView'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-[600px] border rounded-lg">Loading map...</div>
});

interface MapWrapperProps {
  clubs: Club[];
}

const MapWrapper: React.FC<MapWrapperProps> = ({ clubs }) => {
  return <ClubsMapView clubs={clubs} />;
};

export default MapWrapper;
