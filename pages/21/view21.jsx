import Image from 'next/image';

const userData = {
  name: "María García",
  rating: 4,
  comments: [
    { id: 1, text: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones" },
    { id: 2, text: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones" }
  ],
  images: [
    { id: 1, src: "/placeholder.svg?height=100&width=100", alt: "Imagen 1" },
    { id: 2, src: "/placeholder.svg?height=100&width=100", alt: "Imagen 2" },
    { id: 3, src: "/placeholder.svg?height=100&width=100", alt: "Imagen 3" },
    { id: 4, src: "/placeholder.svg?height=100&width=100", alt: "Imagen 4" }
  ]
}

const View21 = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#2F4F4F] mb-12">¡Bienvenido!</h1>

        <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-4xl mx-auto">
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="bg-gradient-to-b from-[#ECEFF1] to-white w-full max-w-[231px] h-auto rounded-[25px] shadow-md p-6 text-center">
              <Image
                src="/perfil1.png"
                alt="Foto de perfil"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{userData.name}</h2>
            </div>
          </div>

          <div className="w-full  lg:w-2/3 flex flex-col justify-center">
            <div className="bg-white rounded-[30px] shadow-md p-6 w-full">
              <div className="flex flex-col md:flex-row md:justify-start gap-4 md:items-center mb-4">
                <h3 className="text-lg font-semibold text-[#2F4F4F] mb-2 md:mb-0">Tu calificación es de:</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">Últimos comentarios:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {userData.comments.map(comment => (
                  <p key={comment.id} className="bg-[#F5F0E5] p-2 rounded text-center text-sm">{comment.text}</p>
                ))}
              </div>

              <button className="bg-[#F5F0E5] text-[#2F4F4F] px-4 py-2 rounded-full transition-colors text-sm font-medium">
                Todos los comentarios
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl text-center font-semibold mb-4 text-[#2F4F4]">Cambia tus imagenes</h3>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center space-x-auto overflow-x-auto pb-4">
            <button className="bg-[#577070] text-white p-2 rounded-[20px] w-[58px] h-[52px] hover:bg-green-800 transition-colors">
              <Image
                src="/Mas.png"
                alt="Foto de perfil"
                width={37}
                height={36}
                className="rounded-full mx-auto mb-0"
              />
            </button>
            {userData.images.map((image, index) => (
              <div key={image.id} className="relative">
                <Image
                  src='/Vector.png'
                  alt={image.alt}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>
            ))}
            <button className="bg-[#577070] text-white p-2 rounded-[20px] w-[58px] h-[52px] hover:bg-green-800 transition-colors">
              <Image
                src="/Basura.png"
                alt="Foto de perfil"
                width={27}
                height={31}
                className="rounded-full mx-auto mb-0"
              />
            </button>
          </div>
        </div>

        {/* <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-[#2F4F4]">Cambia tus imágenes</h3>
            <div className="flex flex-col items-center space-y-4">
              {userData.images.map((image, index) => (
                <div key={image.id} className="relative">
                  <Image
                    src='/Vector.png'
                    alt={image.alt}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </div>
              ))}
              <div className="flex space-x-8 justify-center">
                <button className="bg-[#577070] text-white p-2 rounded-[20px] w-[58px] h-[52px] hover:bg-green-800 transition-colors">
                  <Image
                    src="/Mas.png"
                    alt="Agregar más imágenes"
                    width={37}
                    height={36}
                    className="rounded-full mx-auto"
                  />
                </button>
                <button className="bg-[#577070] text-white p-2 rounded-[20px] w-[58px] h-[52px] hover:bg-green-800 transition-colors">
                  <Image
                    src="/Basura.png"
                    alt="Eliminar imagen"
                    width={27}
                    height={31}
                    className="rounded-full mx-auto"
                  />
                </button>
              </div>
            </div>
          </div> */}


      </div>
    </>
  );
};

export default View21;