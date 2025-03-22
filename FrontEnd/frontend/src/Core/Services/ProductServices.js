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
