import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

// const createCustomIcon = (iconUrl) => new L.Icon({
//     iconUrl: iconUrl1,
//     iconSize: [25, 41], // Adjust size as needed
//     iconAnchor: [12, 41], // Adjust anchor as needed
//     popupAnchor: [1, -34], // Adjust popup anchor as needed
// });

const Citymap = ({ profiles, onHoverProfile }) => {
    const defaultPosition = [33.877750, -84.458230]; // Default to Las Vegas coordinates

    const customIcon = new L.Icon(
        {
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });

    const handleMarkerHover = (profileId) => {
        onHoverProfile(profileId); // Trigger hover profile function from MapView
    };

    return (
        <MapContainer center={defaultPosition} zoom={4} maxZoom={18} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup
                chunkedLoading>
                {profiles.map((profile) => (
                    <Marker
                        key={profile.id}
                        position={[profile.latitude, profile.longitude]}
                        icon={customIcon}
                        // icon={customIcon(profile.iconUrl1)}
                        // icon={createCustomIcon(profile.iconUrl)}
                        eventHandlers={{
                            mouseover: () => handleMarkerHover(profile.id),
                        }}
                    >
                        <Popup>
                            {/* <div style={{ display: "flex" }}>
                                <div className='text-center fs-6'>
                                    <strong className='py-1'>{profile.name}</strong>
                                    <br />
                                    <div><button className='btn btn-green border'>Book Now</button></div>
                                    {profile.profession}
                                </div>

                            </div> */}
                            <div style={{ display: "flex" }}>
                                <img src={profile.image} alt={profile.name} style={{ width: '50px', height: '50px', margin: "0px 10px 0px 0px " }} />
                                <div>
                                    <strong>{profile.name}</strong>
                                    <br />
                                    {profile.profession}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default Citymap;
