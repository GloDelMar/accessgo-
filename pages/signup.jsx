import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();

  // Función para guardar el tipo de usuario en localStorage y redirigir
  const handleUserType = (tipoUsuario, route) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tipoUsuario', tipoUsuario);
    }
    router.push(route);
  };

  return (
    <div className='flex items-center'>
      <div className='flex items-center w-full bg-white'>
        <div className='flex flex-col h-screen my-[40px] items-center bg-white w-[300px] md:w-[600px] p-2'>
          <div className='flex flex-col items-center'>
            <h1 className='text-[#2F4F4F] text-2xl md:text-4xl font-bold mb-8'>
              ¡Bienvenid@ a AccessGo!
            </h1>
            <h3 className='text-[#2F4F4F] text-2xl mt-2 font-bold'>
              Regístrate como persona
            </h3>
            <h3 className='text-[#2F4F4F] text-2xl text-center mt-2'>
              Se parte de nuestra comunidad y ayuda a mejorar las experiencias
              de accesibilidad para todos
            </h3>
          </div>
          <div className='w-[250px] md:w-[350px] mt-4'>
            <div className='mb-2 mt-4'>
              {/* Agregar tipo de usuario como 'usuario' y redirigir */}
              <a
                onClick={() => handleUserType('user', '/deslinde')}
                className='flex items-center rounded-full justify-between bg-[#F5F0E5] hover:bg-[#E0D7C6] px-4 py-2 cursor-pointer'
              >
                <Image
                  src='/iconosLogin/email.png'
                  alt='logo email'
                  width={30}
                  height={30}
                />
                <span className='text-xs md:text-lg'>Continúa con Email </span>
              </a>
            </div>
          </div>
          <div className='flex flex-col items-center  mt-12'>
            <h3 className='text-[#2F4F4F] text-2xl mt-2 font-bold'>
              Regístrate como Empresa
            </h3>
            <h3 className='text-[#2F4F4F] text-2xl text-center mt-2'>
              Elige de entre nuestros planes de servicio el que se ajuste a tu
              modelo de negocio. Y posteriormente completa nuestro formulario de
              accesibilidad, para mostrar al público tus instalaciones y
              servicios.
            </h3>
            <div className='mt-8 w-[250px] md:w-[350px] '>
              {/* Agregar tipo de usuario como 'empresa' y redirigir */}
              <a
                onClick={() => handleUserType('company', '/planes')}
                className='flex items-center rounded-full justify-between bg-[#F5F0E5] hover:bg-[#E0D7C6] px-4 py-2 cursor-pointer'
              >
                <Image
                  src='/iconosLogin/empres.png'
                  alt='Icono de personas de empresa'
                  width={30}
                  height={30}
                />
                <span className='text-xs md:text-lg'>Soy empresa</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;