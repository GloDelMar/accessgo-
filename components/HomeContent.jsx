
import EstablecimientoSlider from "./Molecules/establesamientoSlider";
import ParticipaSlider from "./Molecules/participaSlider";
import Image from 'next/image'
import Link from 'next/link';
import { StyledButton } from "./atoms/Index";


export const categories = [
  { name: 'Restaurantes', rating: 5 },
  { name: 'Hoteles', rating: 5 },
  { name: 'Turismo', rating: 5 },
  { name: 'Espacios Comerciales', rating: 5 },
  { name: 'Restaurantes', rating: 5 },
  { name: 'Hoteles', rating: 5 },
  { name: 'Turismo', rating: 5 },
  { name: 'Espacios Comerciales', rating: 5 },

]
const HomeContent = () => {


  return (
    <div className="flex flex-col text-[#2F4F4F] w-full p-4 justify-center font-sans">

      <div className="flex flex-col md:items-center md:flex-row gap-4 mx-[40px] p-2 text-[#2F4F4F]">
        <div className="flex-1 text-center md:text-left mt-[10px]">
          <p className="text-center mt-[8px] md:text-left">Encuentra tu lugar favorito</p>
          <h1 className="text-4xl font-bold mb-2">¡Bienvenido a AccessGo!</h1>
          <p className="mt-[20px]">
            La accesibilidad es un derecho fundamental. Con AccessGo facilitamos tu búsqueda de establecimientos incluyentes, ayudándote a encontrar lugares que se ajusten a tus necesidades específicas.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <img
            className="h-[200px] md:h-[400px]"
            src="/Group 4717@2x.png"
            alt="Tarjetas con tres imágenes de personas con discapacidad siendo incluidas en diferentes escenarios, de títulos: Accesibilidad, Inclusión, AccessGo"
          />
        </div>
      </div>

      <div className=" mx-2 mt-[40] md:mx-[25px]">
        <h3 className="text-2xl text-center md:text-left font-bold mb-2">Visita a nuestros socios</h3>
        <p className="text-center mt-3 md:text-left">Para ti, que buscas un lugar para pasar un buen rato:</p>
        <div className="hidden md:flex flex-wrap justify-center gap-[17.5px] mt-[51px] mb-4">
          {categories.map((category, index) => (
            <Link legacyBehavior href="/2/view2" key={index}>
              <a>
                <div className="relative rounded-lg w-[200px] h-[241px] shadow-md overflow-hidden">
                  <Image
                    src="/img-card.png"
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 w-[80px]"
                  />
                  <div className="relative p-4 w-[200px] h-[241px] bg-black bg-opacity-50 flex flex-col justify-end">
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
              </a>
            </Link>
          ))}
        </div>
      </div>



      <div className="md:hidden mt-[40px] flex justify-center">

        <EstablecimientoSlider />

      </div>


      <div className="mt-[40px] mx-2 ">
        <h3 className="text-2xl text-center  md:text-left font-bold mb-2">Y también para ti, que buscas ser parte del cambio:</h3>
        <p className="text-center my-[40px] md:text-left">Sé parte del cambio y muestra tu compromiso con la accesibilidad</p>
        <ul className="hidden sm:flex  sm:flex-row items-center justify-center space-x-0 sm:space-x-4 mt-[40px]">
          <Link legacyBehavior href="/voluntario11" >
            <li className="card border rounded w-[223px] rounded-[8px] border-[#E8DECF] h-[178px] mb-4 sm:mb-0 cursor-pointer">
              <div><img className="w-[24px] h-[24px] mt-[16px] ml-[16px] mb-[13px]" src="/ayudar.png" alt="un saludo que establece el acuerdo de ayudar al prógimo" /></div>
              <div><p className="ml-[16px] font-bold">Voluntariado</p>
                <p className="ml-[16px]">Únete a nuestra red de voluntariado y contribuye con tu tiempo y habilidades.</p>
              </div>
            </li>
          </Link>
          <Link legacyBehavior href="/donacion12" >
            <li className="card rounded-[8px] border w-[223px] h-[178px] border-[#E8DECF] mb-4 sm:mb-0 cursor-pointer"><div><img className="w-[24px] h-[24px] mt-[16px] ml-[16px] mb-[13px]" src="/donar.svg" alt="un saludo que establece el acuerdo de ayudar al prógimo" /></div>
              <div><p className="ml-[16px] font-bold">Donaciones</p>
                <p className="ml-[16px]">Apoya con donaciones para mejorar la accesibilidad en diferentes lugares.</p>
              </div></li>
          </Link>
        </ul>

        <div className="md:hidden my-4 flex justify-center">

          <ParticipaSlider />

        </div>
        <div className="my-4  mt-[40px] flex text-center justify-center">
          <h3 className="text-2xl font-bold mb-2">¡Juntos podemos hacer del mundo un lugar más accesible para todos!</h3>
        </div>
        <div className="flex justify-center text-sm space-x-2 my-[40px]">
          <Link legacyBehavior href="/voluntario11" >
            <StyledButton variant="verdeCurvo">¿Quieres ser voluntario?</StyledButton>
          </Link>
          <Link legacyBehavior href="/donacion12" >
            <StyledButton variant="verdeCurvo">¿Quieres hacer un donativo?</StyledButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
