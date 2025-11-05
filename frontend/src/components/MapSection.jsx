import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

export default function MapSection({ geojson, distance, duration }) {
  return (
    <motion.div
      className="mt-10 w-full flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="w-full max-w-6xl h-[400px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        <MapContainer center={[22.5, 88.3]} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geojson && <GeoJSON data={geojson} style={{ color: '#7c3aed', weight: 5 }} />}
        </MapContainer>
      </div>
      {geojson && (
        <div className="mt-2 w-11/12 bg-indigo-50 text-indigo-700 text-lg font-bold px-4 py-2 rounded-md shadow border border-indigo-300 flex justify-between items-center">
          <div>Travel Distance: {distance} km</div>
          <div>Travel Duration Without Delay: {duration} min</div>
        </div>
      )}
    </motion.div>
  );
}
