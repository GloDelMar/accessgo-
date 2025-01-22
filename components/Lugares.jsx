import React, { useState } from "react";

const PlacesNearBy = ({ lugares, onUpdateLugares }) => {
    const [inputRecreativo, setInputRecreativo] = useState("");
    const [inputEmergencia, setInputEmergencia] = useState("");

    const handleAddRecreativo = () => {
        if (inputRecreativo.trim() === "") return;
        const updatedRecreativos = [...(lugares.recreativos || []), inputRecreativo];
        onUpdateLugares("recreativos", updatedRecreativos);
        setInputRecreativo("");
    };

    const handleAddEmergencia = () => {
        if (inputEmergencia.trim() === "") return;
        const updatedEmergencia = [...(lugares.emergencia || []), inputEmergencia];
        onUpdateLugares("emergencia", updatedEmergencia);
        setInputEmergencia("");
    };

    const handleDeleteRecreativo = (indexToRemove) => {
        const updatedRecreativos = (lugares.recreativos || []).filter((_, index) => index !== indexToRemove);
        onUpdateLugares("recreativos", updatedRecreativos);
    };

    const handleDeleteEmergencia = (indexToRemove) => {
        const updatedEmergencia = (lugares.emergencia || []).filter((_, index) => index !== indexToRemove);
        onUpdateLugares("emergencia", updatedEmergencia);
    };

    return (
        <div className="mt-4">
            <h2 className="text-xl font-semibold text-[#263238]">Lugares Importantes Cerca de Ti</h2>
            {/* Recreativos */}
            <div className="mt-3 space-x-2">
                <h3 className="text-sm font-medium text-[#546E7A] mb-2">Para conocer (museos, recreación, playas, etc.):</h3>
                <input
                    type="text"
                    placeholder="Agregar lugar recreativo"
                    value={inputRecreativo}
                    onChange={(e) => setInputRecreativo(e.target.value)}
                    className="border px-2 py-1 rounded-md"
                />
                <button
                    onClick={handleAddRecreativo}
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
                >
                    Agregar
                </button>
                <ul className="mt-1 rounded-lg">
                    {(lugares?.recreativos || []).map((lugar, index) => (
                        <li
                            className="px-2 my-1 bg-[#F5F0E5] flex justify-between border rounded-lg"
                            key={index}
                        >
                            {lugar}
                            <button
                                className="bg-red-500 px-2 rounded-full text-white hover:bg-red-700"
                                onClick={() => handleDeleteRecreativo(index)}
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Emergencia */}
            <div className="mt-3 space-x-2">
                <h3 className="text-sm font-medium text-[#546E7A] mb-2">Emergencias (Hospitales, farmacias, etc.):</h3>
                <input
                    type="text"
                    placeholder="Agregar lugares para una emergencia"
                    value={inputEmergencia}
                    onChange={(e) => setInputEmergencia(e.target.value)}
                    className="border px-2 py-1 rounded-md"
                />
                <button
                    onClick={handleAddEmergencia}
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
                >
                    Agregar
                </button>
                <ul className="mt-1 rounded-lg">
                    {(lugares?.emergencia || []).map((lugar, index) => (
                        <li
                            className="px-2 my-1 bg-[#F5F0E5] flex justify-between border rounded-lg"
                            key={index}
                        >
                            {lugar}
                            <button
                                className="bg-red-500 px-2 rounded-full text-white hover:bg-red-700"
                                onClick={() => handleDeleteEmergencia(index)}
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PlacesNearBy;
