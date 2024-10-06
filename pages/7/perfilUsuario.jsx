import React from "react";
import Image from 'next/image';


const view7 = () => {
    return <>
        
            <h1 className="text-center text-[#2F4F4F] text-2xl p-10 font-bold">¡Bienvenid@ a AccessGo!</h1>

            <div className="flex flex-col items-center lg:flex-row lg:justify-around lg:items-start lg:space-x-8 px-4">
                <div className="w-full lg:w-1/3 flex justify-center">

                    <div className="bg-gradient-to-b from-[#ECEFF1] to-white w-full max-w-[231px] h-auto rounded-[25px] shadow-md p-6 text-center">
                        <Image
                            src="/perfil1.png"
                            alt="Foto de perfil"
                            width={150}
                            height={150}
                            className="rounded-full mx-auto mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-2">nombre</h2>
                    </div>
                    
                </div>

                <div className="flex flex-col items-center space-y-4 py-4 lg:items-start lg:space-y-6">
                    <button className="w-40 bg-[#F5F0E5] py-2 px-4 mx-auto rounded-md text-center">Lugares que visitaste</button>
                    <button className="w-40 bg-[#F5F0E5] py-2 px-4 rounded-md text-center">Tus comentarios</button>
                </div>

                <div className="flex flex-col items-center lg:items-start lg:w-1/3 mt-8 lg:mt-0">
                    <h3 className="text-2xl text-[#2F4F4F]  mb-4">Sobre mi</h3>
                    <div className="bg-white p-6 rounded-md mb-4 text-[#2F4F4F]  shadow-lg w-full max-w-lg">
                        <p className="text-gray-600">
                            Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.
                        </p>
                    </div>
                </div>
            </div>
        

    </>
}

export default view7; 