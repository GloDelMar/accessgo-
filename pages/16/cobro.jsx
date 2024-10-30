import React, { useState } from "react";
import Link from "next/link";


const PlanOption = ({ type, price, isSelected, onSelect }) => (
  <div
    className={`flex gap-5 justify-between px-7 py-3 mt-10 w-full text-center whitespace-nowrap bg-white rounded-xl border border-solid max-w-[249px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer ${isSelected ? "border-blue-500" : "border-black"
      }`}
    onClick={onSelect}
  >
    <div className="self-start font-medium">{type}</div>
    <div className="font-bold">{price}</div>
  </div>
);




const View16 = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const planOptions = [
    { type: "MENSUAL", price: "$1700" },
    { type: "SEMESTRAL", price: "$9000" },
    { type: "ANUAL", price: "$18000" },
  ];

  return (
    <main className="flex overflow-hidden flex-col items-center pb-44 mx-auto w-full text-xl bg-white max-w-[480px] md:max-w-[700px] text-slate-700">
      
      <h1 className="mt-9 font-bold leading-3">¡Elige tu plan!</h1>
      <p className="mt-8 text-sm font-bold text-center">
        ¡Aqui puedes elegir el plan que te interese mas!
      </p>
      <div className="flex flex-col md:space-x-[95px] md:flex-row">
        <div className="flex flex-col mt-2 items-center">
          {planOptions.map((plan, index) => (
            <PlanOption
              key={index}
              type={plan.type}
              price={plan.price}
              isSelected={selectedPlan === index}
              onSelect={() => setSelectedPlan(index)}
            />
          ))}</div>
        
      </div>
      <div className="flex flex-row justify-center mt-5 space-x-4 md:space-x-[200px]">
        
        <button className="w-[155px] h-[40px] bg-white border-2 rounded-lg">
          <Link legacyBehavior href="/"><a>Cancelar</a></Link>
        </button>
        <button className="w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center">
          <Link legacyBehavior href="/23/view23"><a>Pagar</a></Link>
        </button>
      </div>

    </main>
  );
};

export default View16;