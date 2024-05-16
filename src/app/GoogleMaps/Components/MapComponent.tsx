import React, { useState, useEffect, useRef, FC } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import Lottie from 'react-lottie';

interface MarkerData {
  coordinates: [number, number];
  title: string;
}

const Loader = () => {
  return (
    <div className="absolute z-[10000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <svg
        aria-hidden="true"
        className="w-24 h-24 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#FF8080]"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
};

function generateLottiePlayerHTML(): string {
  return `<dotlottie-player 
            src="https://lottie.host/d1626c86-8361-471a-88a9-7baaff52fa06/Hrom5D9Mo4.json" 
            background="transparent" 
            speed="1" 
            style="width: 38px; height: 38px;" 
            loop 
            autoplay
          ></dotlottie-player>`;
}


const MapComponent: FC<{ radius: number, category: string | null , locations:any}> = ({ radius, category ,locations }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [crimeData, setCrimeData] = useState<any[]>([]);

  const mapRef = useRef<any | null>(null);

  const myIcon = L.icon({
    iconUrl: '/placeholder.png',
    iconSize: [38, 39],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });

  const crimeIcon = L.icon({
    iconUrl: '/alarm.png',
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  });


  const DotLottieIcon = L.divIcon({
    className: 'dotlottie-icon',
    html: generateLottiePlayerHTML(),
    iconSize: [52, 38],
    iconAnchor: [19, 19], // Adjust the icon anchor as needed
  });
  

  const BoundsCircle: FC<{ center: [number, number], radius: number }> = ({ center, radius }) => {
    const map = useMap();

    useEffect(() => {
        const topLeft = map.latLngToLayerPoint(center).subtract([radius, radius]);
        const bottomRight = map.latLngToLayerPoint(center).add([radius, radius]);
        const bounds = L.bounds(topLeft, bottomRight);

        const rectangle = L.rectangle(L.latLngBounds(map.layerPointToLatLng(topLeft), map.layerPointToLatLng(bottomRight))).addTo(map);
        
        return () => {
            map.removeLayer(rectangle);
        };
    }, [map, center, radius]);

    return null;
};

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);


  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        const response = await fetch(`https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/8/query?where=1%3D1&outFields=OFFENSE,WARD,SHIFT&f=json`);
        const data = await response.json();
        const metersPerDegreeLatitude = 11131.95;
        const metersPerDegreeLongitude = 11131.95;
        const convertedData = data.features.map((crime: any) => ({
          ...crime,
          geometry: {
            // Convert x-coordinate to longitude
            x: parseFloat((crime.geometry.x / metersPerDegreeLongitude).toFixed(6)),
            // Convert y-coordinate to latitude
            y: parseFloat((crime.geometry.y / metersPerDegreeLatitude).toFixed(6)),
          },
        }));

        // Filter crime data based on selected category
        const filteredData = category ? convertedData.filter((crime: { attributes: { OFFENSE: string; }; }) => crime.attributes.OFFENSE === category) : convertedData;

        setCrimeData(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error("Error fetching crime data:", error);
      }
    };

    fetchCrimeData(); 
  }, [category]);
  
  const ZoomHandler: FC = () => {
    const map = useMap();

    useEffect(() => {
      map.on('zoomend', () => {
        setLoading(false);
      });
    }, [map]);

    return null;
  };

  // Filter crime data based on bounds and radius
  const filteredCrimeData = crimeData.filter((crime) => {
    if (!userLocation) return false;

    const distance = Math.sqrt(Math.pow(crime.geometry.x - userLocation[1], 2) + Math.pow(crime.geometry.y - userLocation[0], 2));
    return distance <= radius;
  });

  return (
    <>
      {loading && <Loader />}
      <MapContainer
        center={userLocation || [-1.1973489, 36.9301873]}
        zoom={11}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {filteredCrimeData.map((crime, index) => (
          <Marker key={index} position={[crime.geometry.y, crime.geometry.x]} icon={crimeIcon}>
            <Popup>{crime.attributes.OFFENSE}</Popup>
          </Marker>
        ))}
       {Array.isArray(locations) && locations.map((location, index) => (
  <Marker
    key={index}
    position={[location.latitude, location.longitude]}
    icon={location.isCanceled ? myIcon : crimeIcon}
  >
    <Popup>{location.title}</Popup>
  </Marker>
))}
        {userLocation && <BoundsCircle  center={userLocation} radius={radius} />}
        <ZoomHandler />
      </MapContainer>
    </>
  );
};

export default MapComponent;
