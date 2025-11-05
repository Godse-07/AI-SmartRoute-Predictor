import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-5 px-4 text-center text-4xl font-bold tracking-wider rounded-b-2xl shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-500"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      Traffic Delay Predictor 🚗
    </motion.header>
  );
}
