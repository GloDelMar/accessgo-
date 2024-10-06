import EstablecimientoSlider from '@/components/Molecules/establesamientoSlider'
import { Link, StyledButton } from '@/components/atoms/Index'
import Image from 'next/image'


export const categories = [
  { name: 'Restaurantes', rating: 5 },
  { name: 'Hoteles', rating: 5 },
  { name: 'Turismo', rating: 5 },
  { name: 'Espacios Comerciales', rating: 5 },
  { name: 'Restaurantes', rating: 5 },
  { name: 'Hoteles', rating: 5 },
  { name: 'Turismo', rating: 5 },
  { name: 'Espacios Comerciales', rating: 5 },
  { name: 'Restaurantes', rating: 5 },
  { name: 'Hoteles', rating: 5 },
  { name: 'Turismo', rating: 5 },
  { name: 'Espacios Comerciales', rating: 5 },
]

const view2 = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center sm:text-left">Visita a nuestros socios</h1>
        <p className="text-gray-600 mb-8 text-center sm:text-left">Para ti, que buscas un lugar para pasar un buen rato.</p>

        <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 mb-8 justify-center sm:justify-start">
          <button className="px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full">
            Con accesibilidad
          </button>
          <button className="px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full">
            Más cercanos
          </button>
          <button className="px-4 py-2 border border-[#EDE6D7] font-semibold text-[#2F4F4F] rounded-full">
            Mejor valorados
          </button>
        </div>

        <div className="md:hidden mt-2 flex justify-center">

          <EstablecimientoSlider />

        </div>

        <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center sm:justify-items-start">
          {categories.map((category, index) => (
            <div key={index} className="relative rounded-lg w-[215px] h-[256px] shadow-md overflow-hidden">
              <Image
                src="/img-card.png"
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 w-full h-full"
              />
              <div className="relative p-4 w-[215px] h-[256px] bg-black bg-opacity-50 flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <div className="flex items-center mt-2">
                  {[...Array(category.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-white mt-2">100% accesible</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4 my-12">
          <Link legacyBehavior href="/voluntario11" >
            <StyledButton variant="verdeCurvo">¿Quieres ser voluntario?</StyledButton>
          </Link>
          <Link legacyBehavior href="/donacion12" >
            <StyledButton className="hidden md:block" variant="verdeCurvo">
              ¿Quieres hacer un donativo?
            </StyledButton>
          </Link>
        </div>


        <h2 className="text-2xl font-bold text-center text-gray-800 mt-16 mb-12">
          ¡Juntos podemos hacer del mundo un lugar<br />más accesible para todos!
        </h2>
      </div>
    </>
  )
}

export default view2;