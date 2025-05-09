import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import FooterComponent from "./FooterComponent";

const PlatformList = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()


  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const response = await axios.get("http://localhost:4000/api/rawg/platforms", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        setPlatforms(response.data.results);
      } catch (error) {
        if(error.response?.status === 401){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href ='/login'
        } else{
            console.error("El token a caducado:", error);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchPlatforms();
  }, []);
  


  if (loading) return <p className="text-white">Cargando plataformas...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Plataformas disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {platforms.map((platform) => (
        <motion.div
          key={platform.id}
          className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
        >
        <img
          src={platform.image_background}
          alt={platform.name}
          className="w-full h-40 object-cover rounded-md mb-2"
        />

        <button
          onClick={() => navigate(`/games/${platform.id}`)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {platform.name}
        </button>
      </motion.div>
      ))}
    </div>
   <FooterComponent />
  </div>
  );
}

export default PlatformList
