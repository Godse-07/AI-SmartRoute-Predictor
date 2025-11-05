// import { useState } from 'react';
// import { motion } from 'framer-motion';

// export default function InputCard({ onPredict }) {
//   const [source, setSource] = useState('');
//   const [destination, setDestination] = useState('');
//   const [time, setTime] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onPredict({ source, destination, time });
//   };

//   return (
//     <motion.div
//       className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.3)] mt-8 border border-indigo-300 transition-all duration-500"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center tracking-wide drop-shadow-md">
//         Enter Trip Details
//       </h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//         <input
//           type="text"
//           placeholder="Enter Source"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//           required
//           className="p-3 rounded-xl border border-indigo-300 bg-white shadow-inner transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:shadow-[0_0_10px_rgba(139,92,246,0.4)]"
//         />
//         <input
//           type="text"
//           placeholder="Enter Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           required
//           className="p-3 rounded-xl border border-indigo-300 bg-white shadow-inner transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:shadow-[0_0_10px_rgba(139,92,246,0.4)]"
//         />
//         <input
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           required
//           className="p-3 rounded-xl border border-indigo-300 bg-white shadow-inner transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:shadow-[0_0_10px_rgba(139,92,246,0.4)]"
//         />
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           type="submit"
//           className="bg-linear-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-3 cursor-pointer rounded-xl font-semibold shadow-lg hover:shadow-[0_0_20px_#8b5cf6] transition-all duration-300"
//         >
//           Predict Route
//         </motion.button>
//       </form>
//     </motion.div>
//   );
// }




import { useState } from 'react';
import { motion } from 'framer-motion';

export default function InputCard({ onPredict }) {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict({ source, destination, time });
  };

  return (
    <motion.div
      className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl mt-8 border border-indigo-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center tracking-wide">
        Enter Trip Details
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Enter Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
          className="p-3 rounded-xl border border-indigo-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="p-3 rounded-xl border border-indigo-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="p-3 rounded-xl border border-indigo-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Predict Route
        </motion.button>
      </form>
    </motion.div>
  );
}





