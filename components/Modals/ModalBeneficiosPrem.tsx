"use client"

import { useState } from "react"

const beneficios = [
  {
    icon: "map-pin",
    title: "Geolocalización Estratégica",
    highlight: "¡Maximiza tu Alcance!",
    description: "Tu negocio visible para miles de clientes potenciales en tu área",
    keywords: ["Visibilidad Local", "Alcance Expandido"],
  },
  {
    icon: "trending-up",
    title: "Posicionamiento Premium",
    highlight: "¡Primero en Resultados!",
    description: "Aparece en las primeras recomendaciones, donde los clientes te verán primero",
    keywords: ["Top Ranking", "Máxima Exposición"],
  },
  {
    icon: "star",
    title: "Sistema de Calificaciones",
    highlight: "¡Construye tu Reputación!",
    description: "Recibe y gestiona calificaciones que aumentan la confianza de tus clientes",
    keywords: ["Credibilidad", "Confianza"],
  },
  {
    icon: "share-2",
    title: "Integración Social Completa",
    highlight: "¡Conecta con tus Clientes!",
    description: "Vincula todas tus redes sociales y contactos en un solo lugar",
    keywords: ["Omnicanal", "Conectividad"],
  },
  {
    icon: "award",
    title: "Marketing Dinámico",
    highlight: "¡Promociones que Impactan!",
    description: "Promociona eventos, ofertas y novedades de forma efectiva",
    keywords: ["Ofertas Exclusivas", "Eventos VIP"],
  },
  {
    icon: "bar-chart",
    title: "Analytics Avanzados",
    highlight: "¡Datos que Impulsan!",
    description: "Analiza el comportamiento de tus visitantes y optimiza tu negocio",
    keywords: ["Insights", "ROI"],
  },
]

export function ModalBeneficiosPrem() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="bg-[#2F4F4F] text-white hover:bg-[#1a2e2e] transition-all duration-300 group border border-transparent rounded-lg px-4 py-2"
        onClick={() => setIsOpen(true)}
      >
        <svg className="mr-2 h-5 w-5 text-[#FFE5B4] group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"></path></svg>
        Descubre AccessGo Premium
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white sm:max-w-[600px] w-full p-6 rounded-lg max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3 transform scale-100 transition-transform duration-300">
                <div className="bg-[#FFE5B4] p-3 rounded-lg rotate-6">
                  <svg className="h-8 w-8 text-[#2F4F4F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"></path></svg>
                </div>
                <h2 className="text-3xl font-bold text-[#2F4F4F]">PREMIUM</h2>
              </div>
              <p className="text-center text-gray-600 text-lg opacity-100 transform translate-y-0 transition-opacity duration-300">
                Desbloquea todo el potencial de tu negocio
              </p>
            </div>
            <div className="grid gap-4 mt-4">
              {beneficios.map((beneficio, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-300 opacity-100 transform translate-x-0"
                >
                  <div className="mt-1 bg-[#2F4F4F] p-2 rounded-lg">
                    <svg className="h-5 w-5 text-[#FFE5B4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={`M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z`}></path></svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#2F4F4F] text-lg">{beneficio.title}</h3>
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <p className="text-green-600 font-semibold text-sm">{beneficio.highlight}</p>
                    <p className="text-gray-600 mt-1">{beneficio.description}</p>
                    <div className="flex gap-2 mt-2">
                      {beneficio.keywords.map((keyword, kidx) => (
                        <span key={kidx} className="bg-[#FFE5B4] text-[#2F4F4F] text-xs px-2 py-1 rounded-full font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              <button
                className="w-full bg-[#2F4F4F] text-white hover:bg-[#1a2e2e] transition-all duration-300 transform hover:scale-105 text-lg font-semibold py-6"
                onClick={() => setIsOpen(false)}
              >
                ¡ÚNETE AHORA A PREMIUM!
              </button>
              <p className="text-center text-sm text-gray-500">Impulsa tu negocio al siguiente nivel</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

