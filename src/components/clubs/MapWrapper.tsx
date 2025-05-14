
import React from 'react';
import { Club } from '@/types/club';
import ClubsMapView from './ClubsMapView';
// Import the CSS directly in the wrapper to ensure it's loaded
import 'leaflet/dist/leaflet.css';
import './ClubsMap.css';

interface MapWrapperProps {
  clubs: Club[];
}

const MapWrapper: React.FC<MapWrapperProps> = ({ clubs }) => {
  return <ClubsMapView clubs={clubs} />;
};

export default MapWrapper;
