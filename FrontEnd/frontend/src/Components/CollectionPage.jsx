import React, {useEffect, useState} from 'react'
import { getUserGame } from '../Core/Services/ProductServices'
import DashBoardComponent from './DashBoardComponent'

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


  return (
    <>
    <DashBoardComponent />
    <div className="min-h-screen bg-gray-900 text-white p-4">
        <h2 className="text-3xl font-bold mb-6 text-center">🎮 Mi colección</h2>

            {game.length === 0 ? (
            <p className="text-center text-gray-400">No tienes juegos guardados aún.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {game.map((game) => (
                        <div
                            key={game.rawId}
                            className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                            >
                            <img
                                src={game.coverImageUrl}
                                alt={game.title}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                                <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                                <p className="text-sm text-gray-400 mb-2">Plataforma: {game.platform}</p>
                                <span className="text-xs px-2 py-1 bg-blue-700 rounded-full text-white">
                                {game.status || "Por jugar"}
                            </span>
                        </div>
                        ))}
                    </div>
                )}
    </div> 
  </>
  )
}

export default CollectionPage