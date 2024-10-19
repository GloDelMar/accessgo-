"use client";

function ButtonCheckout({ priceId }) {
  return (
    <button
      className="w-[155px] h-[40px] bg-[#2F4F4F] text-white rounded-lg flex items-center justify-center"
      onClick={async () => {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({
                priceId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        window.location.href = data.url
      }}
    >
      Pagar
    </button>
  );
}

export default ButtonCheckout;
