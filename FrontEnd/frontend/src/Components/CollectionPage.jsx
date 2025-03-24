import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion'
import { getUserGame, deleteGameFromCollection, updateGameStatus } from '../Core/Services/ProductServices'
import DashBoardComponent from './DashBoardComponent'
import FooterComponent from './FooterComponent'

const CollectionPage = () => {

    const [game, setGame] = useState([])

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const games = await getUserGame()
                setGame(games)
            } catch (error) {
                console.error('Error al obtener juegos del usuario', error)
            }
        };

        fetchGame();
    },[]);

    const getStatusColorClass = (status) => {
        switch (status) {
          case "jugado":
            return "bg-green-600 text-white";
          case "jugando":
            return "bg-blue-600 text-white";
          case "por jugar":
          default:
            return "bg-yellow-600 text-white";
        }
      };
      

    const handleDelete = async (id) => {
        try {
          await deleteGameFromCollection(id);
          setGame((Games) => Games.filter((game) => game._id !== id));
        } catch (error) {
          console.error("Error al eliminar el juego:", error);
          alert("No se pudo eliminar el juego");
        }
      };

      const handleStatusChange = async (id, newStatus) => {
        try {
          const updatedGame = await updateGameStatus(id, newStatus);
          setGame((prevGames) =>
            prevGames.map((g) => (g._id === id ? { ...g, status: updatedGame.status } : g))
          );
        } catch (error) {
          console.error("Error al actualizar el estado:", error);
          alert("No se pudo actualizar el estado del juego");
        }
      };
      

  return (
    <>
    <DashBoardComponent />
    <div className="min-h-screen bg-gray-900 text-white p-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Mi colección</h2>

            {game.length === 0 ? (
            <p className="text-center text-gray-400">No tienes juegos guardados aún.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {game.map((game) => (
                        <motion.div
                            key={game.rawId}
                            className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                            >
                            <img
                                src={game.coverImageUrl}
                                alt={game.title}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                                <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                                <p className="text-sm text-gray-400 mb-2">Plataforma: {game.platform}</p>
                                <select
                                    value={game.status}
                                    onChange={(e) => handleStatusChange(game._id, e.target.value)}
                                    className={`mt-2 w-full py-2 px-2 rounded text-sm text-center focus:outline-none ${getStatusColorClass(game.status)}`}
                                    >
                                    <option value="por jugar">Por jugar</option>
                                    <option value="jugando">Jugando</option>
                                    <option value="jugado">Jugado</option>
                                </select>


                            <motion.button
                                onClick={() => handleDelete(game._id)}
                                style={{backgroundColor: '#ef4444', color: 'white'}}
                                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition mt-4"
                                >
                                <p>Eliminar de colección</p>
                            </motion.button>
                        </motion.div>
                        ))}
                    </div>
                )}
                <FooterComponent />
                </div>
  </>
  )
}

export default CollectionPage