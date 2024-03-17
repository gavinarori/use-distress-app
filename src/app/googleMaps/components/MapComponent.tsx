import React, { useState, useEffect, useRef, FC } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

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

const MapComponent: FC<{ radius: number }> = ({ radius }) => {
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

  const BoundsCircle: FC<{ center: [number, number], radius: number }> = ({ center, radius }) => {
    const map = useMap();

    const topLeft = map.latLngToLayerPoint(center).subtract([radius, radius]);
    const bottomRight = map.latLngToLayerPoint(center).add([radius, radius]);
    const bounds = L.bounds(topLeft, bottomRight);

    useEffect(() => {
      const rectangle = L.rectangle(L.latLngBounds(map.layerPointToLatLng(topLeft), map.layerPointToLatLng(bottomRight))).addTo(map);
      return () => {
        map.removeLayer(rectangle);
      };
    }, [map, bounds]);

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
  
        // Define constants for conversion
        const metersPerDegreeLatitude = 111319.5;
        const metersPerDegreeLongitude = 111319.5;
  
        // Convert coordinates from projected coordinate system to lat lng
        const convertedData = data.features.map((crime: any) => ({
          ...crime,
          geometry: {
            // Convert x-coordinate to longitude
            x: parseFloat((crime.geometry.x / metersPerDegreeLongitude).toFixed(3)),
            // Convert y-coordinate to latitude
            y: parseFloat((crime.geometry.y / metersPerDegreeLatitude).toFixed(3)),
          },
        }));
  
        setCrimeData(convertedData);
        console.log(convertedData);
      } catch (error) {
        console.error("Error fetching crime data:", error);
      }
    };
  
    fetchCrimeData(); // Call the function here to execute it when the component mounts
  }, []);
  

  const ZoomHandler: FC = () => {
    const map = useMap();

    useEffect(() => {
      map.on('zoomend', () => {
        setLoading(false);
      });
    }, [map]);

    return null;
  };

  return (
    <>
      {loading && <Loader />}
      <MapContainer
        center={[38.9072, -77.0369]}
        zoom={11}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userLocation && <Marker position={userLocation} icon={myIcon}><Popup>Your Location</Popup></Marker>}
        {crimeData.map((crime, index) => (
  <Marker key={index} position={[crime.geometry.y, crime.geometry.x]} icon={crimeIcon}>
    <Popup>{crime.attributes.OFFENSE}</Popup>
  </Marker>
))}

        {userLocation && <BoundsCircle  center={userLocation} radius={radius} />}
        <ZoomHandler />
      </MapContainer>
    </>
  );
};

export default MapComponent;
