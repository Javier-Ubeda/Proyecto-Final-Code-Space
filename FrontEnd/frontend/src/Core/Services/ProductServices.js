import axios from "axios";

export const addGameToCollection = async (game) => {
  try {
    const token = localStorage.getItem("token");

    const gameData = {
      rawId: game.rawId,
      title: game.title,
      platform: game.platform || "Desconocida",
      coverImageUrl: game.coverImageUrl
    };

    console.log('game', game)
    console.log('gameData', gameData)

    const response = await axios.post(
      "http://localhost:4000/api/rawg",
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
  try {
    const token = localStorage.getItem('token')

    if(!token){
      return console.error('Token no encontrado, reinicia la sesion')
    }

    const res = await axios.get('http://localhost:4000/api/user/game', {
      headers:{
      Authorization:`Bearer ${token}`
      }
  });

  return res.data
  } catch (error) {
    if(error.response?.status === 401){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }{
      console.log('Error al caducar el token')
    }
  }
  
};

export const createCollection = async (game) => {

  const token = localStorage.getItem('token')
  console.log('TOKEN', token)

  console.log('GAME', game)
  const res = await axios.post('http://localhost:4000/api/user/', {
    rawId: game.id,
    title: game.name,
    platform: game.platforms?.[0]?.platform.name || 'Desconocido',
    coverImageUrl: game.background_image
  }, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}

export const deleteGameFromCollection = async (gameId) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`http://localhost:4000/api/rawg/${gameId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateGameStatus = async (id, status) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    `http://localhost:4000/api/rawg/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

