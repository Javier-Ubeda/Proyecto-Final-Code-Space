import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addGameToCollection } from "../Core/Services/ProductServices";

const GameDetails = () => {
  const { id } = useParams(); // ID del juego desde la URL
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true)

  const API_KEY = import.meta.env.VITE_RAWG_KEY

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        setGame(res.data);
      } catch (error) {
        console.error("Error al obtener detalles del juego:", error);
      } finally {
        setLoading(false)
      }
    };

    fetchGame();
  }, [id]);

  if(loading) return <p className="text-white">Cargando Detalles</p>

  const handleAddToCollection = () => {
    addGameToCollection({
      rawId: game.id,
      title: game.name,
      platform: game.platforms?.[0]?.platform.name || "Desconocido",
      coverImageUrl: game.background_image,
    })
      .then(() => alert("Juego guardado en tu colección"))
      .catch(error => {
        console.error(error)
        alert(error.response?.data?.message || 'No se pudo guardar el juego')
      });
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
       <div
          className="absolute inset-0 bg-cover bg-center blur-sm brightness-50"
          style={{ backgroundImage: `url(${game.background_image || ''})` }}
        ></div>

      <div className="relative z-10 p-6 flex flex-col items-center">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full object-contain bg-black rounded-t-lg"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{game.name}</h1>

          <p className="text-gray-300 text-sm mb-6 max-h-40 overflow-auto">{game.description_raw || "Sin descripción."}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
            <p><strong>Plataformas:</strong> {game.platforms?.map(p => p.platform.name).join(", ")}</p>
            <p><strong>Géneros:</strong> {game.genres?.map(g => g.name).join(", ")}</p>
            <p><strong>Fecha de lanzamiento:</strong> {game.released}</p>
            <p><strong>Rating:</strong> {game.rating}</p>
          </div>

          {game && (
            <button
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
              onClick={handleAddToCollection}
              >
              Agregar a mi colección
            </button>
          )}
      </div>
    </div>
  </div>
  );
};

export default GameDetails;
