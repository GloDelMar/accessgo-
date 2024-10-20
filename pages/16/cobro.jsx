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

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    bank: "",
    amount: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start px-6 pt-4 pb-9 mt-10 w-full text-sm font-light bg-white border border-gray-100 border-solid shadow-lg max-w-[328px] rounded-[30px]"
    >
      <div className="flex gap-5 self-center px-3.5 pt-1.5 pb-3 max-w-full text-base font-bold text-lime-50 rounded-2xl bg-slate-700 w-[205px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a70999a1b7f5632a7d35a579c53763f5df9e89e8e2f6de522b7d2f408e1f6782?placeholderIfAbsent=true&apiKey=94b7d1b7a1ff491ea399fe140abd93c0"
          alt=""
          className="object-contain shrink-0 self-start w-8 aspect-[1.07]"
        />
        <span className="grow shrink w-[121px]">Tarjeta de crédito</span>
      </div>
      <label htmlFor="bank" className="sr-only">
        Banco
      </label>
      <input
        id="bank"
        type="text"
        placeholder="BANCO"
        value={formData.bank}
        onChange={handleInputChange}
        className="self-stretch px-10 pt-1.5 pb-6 mt-16 text-center border-b border-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
      />
      <label htmlFor="amount" className="sr-only">
        Monto
      </label>
      <input
        id="amount"
        type="text"
        placeholder="MONTO$$"
        value={formData.amount}
        onChange={handleInputChange}
        className="px-10 pt-2 pb-5 mt-10 max-w-full text-center whitespace-nowrap border-b border-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[239px]"
      />
      <label htmlFor="expiry" className="sr-only">
        Fecha de expiración
      </label>
      <input
        id="expiry"
        type="text"
        placeholder="MM/AA"
        value={formData.expiry}
        onChange={handleInputChange}
        className="px-11 py-4 mt-10 max-w-full text-center whitespace-nowrap border-b border-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[217px]"
      />
      <label htmlFor="cvv" className="sr-only">
        CVV
      </label>
      <input
        id="cvv"
        type="text"
        placeholder="CVV"
        value={formData.cvv}
        onChange={handleInputChange}
        className="px-8 pt-2 pb-5 mt-10 max-w-full text-center whitespace-nowrap border-b border-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[239px]"
      />

    </form>
  );
};

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
        <PaymentForm />
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