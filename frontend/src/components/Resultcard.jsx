import { motion } from 'framer-motion';

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <motion.div
      className="max-w-lg mx-auto mt-10 bg-linear-to-br from-indigo-100 via-purple-200 to-pink-100 p-6 rounded-3xl shadow-xl border border-indigo-300 ring-1 ring-purple-300 backdrop-blur-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-3xl font-bold text-indigo-700 mb-4 tracking-wide">🚦 Predicted Results</h3>

      <p className="text-gray-800 text-lg mb-2">
        <strong className="text-indigo-600 text-2xl">Expected Delay:</strong>{' '}
        <span className="text-rose-500 font-bold text-2xl animate-pulse shadow-[0_0_10px_#f87171]">
          {result.delay} minutes
        </span>
      </p>

      <p className="text-gray-700 text-md mb-1">
        <strong className="text-purple-600">Weather:</strong> {result.weather}
      </p>
      <p className="text-gray-700 text-md mb-1">
        <strong className="text-blue-600">Temperature:</strong> {result.temperature}°C
      </p>

      <p className="text-gray-700 text-md mb-3">
       <strong className="text-teal-600">Visibility:</strong> {result.visibility} km
      </p>

      <p className="text-gray-700 text-md">
        <strong className="text-pink-600">Best Route:</strong> {result.route}
      </p>
    </motion.div>
  );
}
