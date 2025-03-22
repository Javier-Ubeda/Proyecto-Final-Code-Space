import axios from "axios";

export const addGameToCollection = async (game) => {
  try {
    const token = localStorage.getItem("token");

    const gameData = {
      rawgId: game.id,
      title: game.name,
      platform: game.platforms?.[0]?.platform?.name || "Desconocida",
      coverImageUrl: game.background_image
    };

    const response = await axios.post(
      "http://localhost:4000/api/games",
      gameData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("🎉 Juego guardado en tu colección");
  } catch (error) {
    console.error("Error al guardar el juego:", error.response?.data || error.message);
    alert("Hubo un error al guardar el juego");
  }
};

export const getUserGame = async () => {
  const token = localStorage.getItem('token')

  const res = await axios.get('http://localhost:4000/api/user/game', {
    headers:{
      Authorization:`Bearer ${token}`
    }
  });

  return res.data
};

export const createCollection = async (game) => {

  const token = localStorage.getItem('token')
  console.log('TOKEN', token)

  const res = await axios.post('http://localhost:4000/api/user/', {
    rawId: game.id,
    title: game.name,
    platform: game.platform?.[0]?.name || 'Desconocido',
    coverImagerUrl: game.background_image
  }, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}