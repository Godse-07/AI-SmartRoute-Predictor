export default function Footer() {
return (
<footer className="text-center py-6 text-gray-500 text-sm mt-10">
© {new Date().getFullYear()} Traffic Delay Predictor. Built with ❤️ Powered by Openrouteservice, weatherapi and Machine Learning.
</footer>
);
}