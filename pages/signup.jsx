import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center w-full bg-white">
        <div className="flex flex-col h-screen my-[40px]  items-center bg-white w-[300px] md:w-[600px] p-2">
          <div className="flex flex-col items-center">
            <h1 className="text-[#2F4F4F] text-2xl md:text-4xl font-bold mb-2">
              ¡Bienvenid@ a AccessGo!
            </h1>
            <h3 className="text-[#2F4F4F] text-lg mt-2 font-bold">Regístrate como persona</h3>
          </div>
          <div className="w-[250px] md:w-[350px] mt-4">
            <div className="mb-2">
              <Link legacyBehavior href="#">
                <a className="flex items-center rounded-full justify-between bg-[#F5F0E5] hover:bg-[#E0D7C6] px-4 py-2">
                <Image src="/iconosLogin/icons8-logo-de-google-50.png" alt="Logo de Google" width={30} height={30} />
                  <span className="text-xs md:text-lg">Continúa con Google</span>
                </a>
              </Link>
            </div>
            <div className="mb-2">
              <Link legacyBehavior href="#">
                <a className="flex items-center rounded-full justify-between bg-[#F5F0E5] hover:bg-[#E0D7C6] px-4 py-2">
                <Image src="/iconosLogin/icons8-facebook-50.png" alt="Logo de Facebook" width={30} height={30} />
                  <span className="text-xs md:text-lg">Continúa con Facebook</span>
                </a>
              </Link>
            </div>
            <div className="mb-2">
              <Link legacyBehavior href="#">
                <a className="flex items-center rounded-full justify-between bg-[#F5F0E5] hover:bg-[#E0D7C6] px-4 py-2">
                <Image src="/iconosLogin/icons8-mac-os-50.png" alt="Logo de Apple" width={30} height={30} />
                  <span className="text-xs md:text-lg">Continúa con Apple</span>
                </a>
              </Link>
            </div>
            <div className="mb-2">
              <Link legacyBehavior href="/4/registroUsuario">
                <a className="flex items-center rounded-full justify-between bg-[#F5F0E5] hover:bg-[#E0D7C6] px-4 py-2">
                <Image src="/iconosLogin/icons8-whatsapp-50.png" alt="Logo de WhatsApp" width={30} height={30} />
                  <span className="text-xs md:text-lg">Continúa con email o WhatsApp</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center w-[250px] md:w-[400px] mt-4">
            <h3 className="text-[#2F4F4F] text-lg font-bold mb-2">Regístrate como empresa</h3>
            <div className="mt-2 w-[250px] md:w-[350px]">
              <Link legacyBehavior href="/notificacion13">
                <a className="flex items-center rounded-full justify-between bg-[#F5F0E5] hover:bg-[#E0D7C6] px-4 py-2">
                <Image src="/iconosLogin/icons8-empresa-24.png" alt="Icono de personas de empresa" width={30} height={30} />
                  <span className="text-xs md:text-lg">Soy empresa</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
