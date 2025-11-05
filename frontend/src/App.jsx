// import { useState } from 'react';
// import './App.css';
// import Header from './components/Header';
// import InputCard from './components/Inputcard';
// import MapSection from './components/MapSection';
// import ResultCard from './components/Resultcard';
// import Footer from './components/Footer';

// export default function App() {
//   const [geojson, setGeojson] = useState(null);
//   const [duration, setDuration] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handlePredict = async ({ source, destination, time }) => {
//     setLoading(true);
//     const res = await fetch("http://localhost:5000/predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ source, destination, time })
//     });
//     const data = await res.json();
//     setResult(data);
//     setGeojson(data.geojson);
//     setDuration(data.duration);
//     setDistance(data.distance);
//     setLoading(false);
//   };
//  return (
//     <div className="min-h-screen bg-linear-to-br from-indigo-100 to-purple-50 flex flex-col opacity-95">
//       <Header />
//       <InputCard onPredict={handlePredict} />
//       {loading && (
//        <div className="flex flex-col items-center mt-6 text-indigo-600 font-semibold">
//        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-indigo-500 mb-3"></div>
//         <p className="animate-pulse">🚀 Predicting route delay... hang tight!</p>
//        </div>
//       )}
//       <MapSection geojson={geojson} distance={distance} duration={duration} />
//       <ResultCard result={result} />
//       <Footer />
//     </div>
//   );
// }



import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import InputCard from './components/Inputcard';
import MapSection from './components/MapSection';
import ResultCard from './components/Resultcard';
import Footer from './components/Footer';

export default function App() {
  const [geojson, setGeojson] = useState(null);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async ({ source, destination, time }) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, destination, time })
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
      setGeojson(data.geojson);
      setDuration(data.duration);
      setDistance(data.distance);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message.includes('Failed to fetch') 
        ? 'Cannot connect to server. Make sure the backend is running on http://localhost:5000'
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-50 flex flex-col">
      <Header />
      <InputCard onPredict={handlePredict} />
      
      {error && (
        <div className="max-w-xl mx-auto mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {loading && (
        <div className="flex flex-col items-center mt-6 text-indigo-600 font-semibold">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-indigo-500 mb-3"></div>
          <p className="animate-pulse">🚀 Predicting route delay... hang tight!</p>
        </div>
      )}
      
      <MapSection geojson={geojson} distance={distance} duration={duration} />
      <ResultCard result={result} />
      <Footer />
    </div>
  );
}








