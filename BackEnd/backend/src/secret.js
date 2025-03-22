// URL_Informacion = 'https://api.rawg.io/api/platforms?key=d1b0e6ec5ff342b1aa4a54c4c2aa262a'

// URL_Detalles = 'https://api.rawg.io/api/games?key=d1b0e6ec5ff342b1aa4a54c4c2aa262a&dates=2019-09-01,2019-09-30&platforms=18,1,7'

const crypto = require('crypto')

const secret = 'Hola esto es la contraseña de javi REFRESSQUEE'

const secret2 = 'Actualizamos para que se REFRESQUEE'

const hash = crypto.createHmac('sha256', secret).update(secret2).digest('hex')

console.log(hash)