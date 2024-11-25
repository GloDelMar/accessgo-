import MapWithPlaces from "./MapWithPlaces";
import Link from "next/link";

const mapContainer = () => {

    return (

        <div className='w-full p-4 h-screen'>
            <h1 className="text-4xl text-center md:text-left font-bold mb-2 text-[#2F4F4F]">Visita a nuestros socios</h1>
            <p className="text-center mt-3 mb-3 md:text-left">Busca en el mapa los establecimientos más cercanos a tí:</p>

            <MapWithPlaces />
            
        </div>
    )
}

export default mapContainer