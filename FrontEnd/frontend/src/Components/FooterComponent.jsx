import React, {useState} from 'react'

const FooterComponent = () => {
    
    const [showName, setShowName] = useState(false)

  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm">
    
        <div className="w-full flex flex-col items-center mb-4 md:mb-0">
          <p className='text-center'>&copy; {new Date().getFullYear()} GameVault. Todos los derechos reservados.</p>
          {showName && <p className="mt-2 text-blue-400 text-center">Desarrollado por Javier - GitHub: Javier-Ubeda</p>}
        </div>

        
        <div className="w-full md:w-auto flex justify-center md:justify-end space-x-4">
          <a
            href="#"
            className="hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setShowName(true);
            }}
            >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent