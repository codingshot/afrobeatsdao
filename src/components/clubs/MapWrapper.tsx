
import React from 'react';
import { Club } from '@/types/club';
import ClubsMapView from './ClubsMapView';
import './ClubsMap.css';

interface MapWrapperProps {
  clubs: Club[];
}

const MapWrapper: React.FC<MapWrapperProps> = ({ clubs }) => {
  return <ClubsMapView clubs={clubs} />;
};

export default MapWrapper;
