import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { createCollection } from '../Core/Services/ProductServices'
import DashBoardComponent from './DashBoardComponent'

const GamesByPlatformComponent = () => {

    const {platformId} = useParams()
    const [games, setGames] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [platformName, setPlatformName] = useState('')

    const navigate = useNavigate()
    const API_KEY = import.meta.env.VITE_RAWG_KEY

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const searchParam = search ? `&search=${search}` : ''
                const res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=12&page=${page}&platforms=${platformId}${searchParam}`)
                console.log('platformID', platformId)
                console.log('API_KEY', API_KEY)
                setGames(res.data.results)
            } catch (error) {
                console.error('Error al obtener los juegos', error)
            }
        };
        fetchGames()
    }, [platformId, search, page])

    useEffect(() => {
        const fetchPlatformName = async () => {
          try {
            const res = await axios.get(`https://api.rawg.io/api/platforms/${platformId}?key=${API_KEY}`);
            setPlatformName(res.data.name);
          } catch (error) {
            console.error("Error al obtener el nombre de la plataforma", error);
          }
        };
      
        fetchPlatformName();
      }, [platformId]);

    useEffect(() => {
        window.scroll(0, 0)
    }, [page])

    const handleAddToCollection = async (game) => {
        try {
            await createCollection({
                rawId: game.id,
                title: game.name,
                platform: game.parent_platforms?.[0]?.platform.name || 'Desconocido',
                coverImageUrl: game.background_image,
            })

            alert(`${game.name} Ha sido guardadon en tu coleccion`)
        } catch (error) {
            console.error('No se puedo guardar el juego en tu coleccion', error)
        }
    };


  return (
    <>
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <DashBoardComponent />
            <div className="mb-6 flex justify-start">
                <button
                    onClick={() => navigate('/home')}
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                    ⬅ Volver a plataformas
                </button>
            </div>
      <h2 className="text-3xl font-bold mb-6 text-center">Juegos para {platformName || 'Plataforma'}</h2>
        <div className="mb-6 flex justify-center">
            <input
                type="text"
                placeholder="Buscar juego por nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md p-3 rounded bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.length === 0 ? (
            <p className="text-center col-span-full text-gray-400 text-lg">
                No se encontraron juegos con ese nombre.
            </p>
            ) : (

            games.map((game) => (
                <div key={game.id} className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between">
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="w-full h-40 object-cover rounded mb-2"
                    />
                <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
                <button
                    onClick={() => handleAddToCollection(game)}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                    Agregar a mi colección
                </button>
                <button
                    onClick={() => navigate(`/game/${game.id}`)}
                    className="mt-2 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    >
                    Ver detalles
                </button>
        </div>
        ))
        )}
      </div>
        <div className="transition-all duration-700 ease-in-out">
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
    </div>
    </>
  )
}

export default GamesByPlatformComponent