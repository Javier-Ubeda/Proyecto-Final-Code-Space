import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashBoardComponent from "../DashBoardComponent";
import FooterComponent from "../FooterComponent";

const DetailsList = () => {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_RAWG_KEY;

  
  const fetchGames = async () => {
    try {
      const genreParam = selectedGenre ? `&genres=${selectedGenre}` : "";
      const res = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=12&page=${page}${genreParam}`
      );
      setGames(res.data.results);
    } catch (error) {
      console.error("Error al obtener juegos:", error);
    }
  };

  // Obtener géneros
  const fetchGenres = async () => {
    try {
      const res = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      setGenres(res.data.results);
    } catch (error) {
      console.error("Error al obtener géneros:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchGames();
  }, [selectedGenre, page]);

  return (
    <>
    <DashBoardComponent />
    <motion.div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center"> Todos los Juegos de consola</h2>
      <div className="mb-6 flex justify-start">
        <motion.button
          onClick={() => navigate('/home')}
          style={{backgroundColor: '#ef4444', color: 'white'}}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
        ⬅ Volver a plataformas
        </motion.button>
      </div>
     

      {/* Filtro de género */}
      <div className="mb-6 flex justify-center">
        <select
          className="bg-gray-800 text-white p-2 rounded border border-gray-700"
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setPage(1); 
          }}
        >
          <option value="">Todos los géneros</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.slug}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de juegos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <motion.div
            key={game.id}
            className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
              <p className="text-sm text-gray-400 mb-4">Lanzado: {game.released}</p>
              <p className="text-sm text-gray-400 mb-2">{game.platforms?.[0]?.platform?.name || 'Desconocido'}</p>
              
              <div className="mt-auto">
              <button
                className=" bg-blue-600 hover:bg-blue-700 w-full text-white py-2 rounded transition"
                onClick={() => navigate(`/game/${game.id}`)}
              >
                Ver detalles
              </button>
              </div>
              
            </div>
          </motion.div>
        ))}
      </div>

      {/* Paginación */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          ⬅ Anterior
        </button>
        <span className="self-center">Página {page}</span>
        <button
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => setPage(page + 1)}
        >
          Siguiente ➡
        </button>
      </div>
      <FooterComponent />
    </motion.div>
    </>
   
  );
};

export default DetailsList;
