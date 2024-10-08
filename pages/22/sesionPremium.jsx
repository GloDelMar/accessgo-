import React from 'react';

const Header = () => {
  return (
    <header className="flex overflow-hidden flex-wrap gap-5 justify-between items-center pt-4 pr-20 pb-1 pl-10 w-full text-sm font-medium bg-white shadow-[0px_8px_32px_rgba(0,0,0,0.08)] max-md:px-5 max-md:max-w-full">
      <div className="flex gap-1.5 self-stretch my-auto text-green-600">
        <img loading="lazy" src="http://b.io/ext_10-" alt="" className="object-contain shrink-0 w-10 aspect-[1.33]" />
        <div className="my-auto">
          <span className="font-extrabold text-yellow-500">A</span>
          <span className="font-extrabold">ccess</span>
          <span className="font-extrabold text-slate-700">G</span>
          <span className="font-extrabold">o</span>
        </div>
      </div>
      <nav className="flex gap-10 items-center self-stretch my-auto text-slate-600">
        <a href="#" className="self-stretch my-auto w-[35px]">Inicio</a>
        <a href="#" className="self-stretch my-auto w-24">Cerrar Sesion</a>
      </nav>
      <img loading="lazy" src="http://b.io/ext_11-" alt="" className="object-contain shrink-0 self-start aspect-square w-[45px]" />
    </header>
  );
};

const ProfileSection = ({ name, rating, comments }) => {
  return (
    <div className="flex gap-5 max-md:flex-col">
      <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow px-5 py-10 w-full text-2xl font-medium leading-none text-center text-black whitespace-nowrap bg-white rounded-3xl border border-gray-100 border-solid shadow-lg max-md:mt-10">
          <img loading="lazy" src="http://b.io/ext_12-" alt={`Profile picture of ${name}`} className="object-contain aspect-[0.9] rounded-[100px] w-[188px]" />
          <div className="self-center mt-12 max-md:mt-10">{name}</div>
        </div>
      </div>
      <div className="flex flex-col ml-5 w-[69%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col items-start px-8 pt-6 pb-11 mx-auto w-full text-xl font-medium text-center text-cyan-900 bg-white rounded-[30px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-4 leading-tight">
            <div className="grow">Tu calificación es de :</div>
            <img loading="lazy" src="http://b.io/ext_13-" alt={`Rating: ${rating}`} className="object-contain shrink-0 my-auto w-28 max-w-full aspect-[5.59]" />
          </div>
          <div className="mt-10 leading-tight">Ultimos comentarios:</div>
          <div className="flex gap-5 self-stretch mt-10 text-xs leading-6 text-slate-700">
            {comments.map((comment, index) => (
              <div key={index} className="px-2 pt-1.5 pb-4 bg-lime-50">{comment}</div>
            ))}
          </div>
          <button className="px-2.5 py-0.5 mt-11 text-base bg-lime-50 rounded-[30px] max-md:mt-10">Todos los comentarios</button>
        </div>
      </div>
    </div>
  );
};

const SideMenu = () => {
  return (
    <nav className="px-4 py-40 w-full text-sm text-black bg-zinc-300 max-md:py-24 max-md:pr-5 max-md:mt-10">
      <ul>
        <li>Editar perfil</li>
        <li>Editar Accesibilidad</li>
        <li>editar</li>
        <li>direccion</li>
      </ul>
    </nav>
  );
};

const ImageCarousel = ({ images }) => {
  return (
    <section>
      <h2 className="self-start mt-20 ml-64 text-xl font-medium leading-tight text-center text-cyan-900 max-md:mt-10 max-md:ml-2.5">Cambia tus imagenes</h2>
      <div className="flex flex-wrap gap-5 justify-between self-center mt-12 ml-5 max-w-full w-[794px] max-md:mt-10">
        <img loading="lazy" src="http://b.io/ext_14-" alt="" className="object-contain shrink-0 my-auto bg-gray-500 rounded-3xl aspect-[1.09] w-[60px]" />
        {images.map((image, index) => (
          <img key={index} loading="lazy" src={image} alt="" className="object-contain shrink-0 max-w-full aspect-[1.24] w-[119px]" />
        ))}
        <img loading="lazy" src="http://b.io/ext_15-" alt="" className="object-contain shrink-0 my-auto bg-gray-500 rounded-3xl aspect-[1.11] w-[58px]" />
      </div>
    </section>
  );
};

const EventList = ({ events }) => {
  return (
    <section>
      <h2 className="self-start mt-10 text-xl font-medium leading-snug text-slate-600 max-md:ml-0.5">Todos tus Eventos</h2>
      <div className="flex flex-col items-start self-center pt-4 pr-5 pb-7 pl-2.5 mt-3 w-full text-xl font-bold tracking-wider leading-none uppercase rounded-2xl bg-slate-700 bg-opacity-50 max-w-[1204px] text-slate-700 max-md:max-w-full">
        {events.map((event, index) => (
          <div key={index} className="flex flex-wrap gap-3 w-full max-w-[980px] max-md:max-w-full">
            <div className="px-16 py-3 text-lg font-semibold tracking-wider leading-none bg-white rounded-md max-md:px-5">
              <span className="text-xl font-bold">{event.name}</span>
            </div>
            <div className="px-14 py-3 whitespace-nowrap bg-white rounded-md max-md:px-5">{event.date}</div>
            <div className="px-10 py-3 whitespace-nowrap bg-white rounded-md max-md:px-5">{event.time}</div>
            <div className="px-16 py-3 whitespace-nowrap bg-white rounded-md max-md:px-5">EDITAR</div>
          </div>
        ))}
        <button className="px-11 py-5 my-auto whitespace-nowrap bg-white rounded-3xl max-md:px-5">AGREGAR</button>
      </div>
    </section>
  );
};

const PromotionList = ({ promotions }) => {
  return (
    <section>
      <h2 className="self-start mt-20 text-xl font-medium leading-snug text-slate-600 max-md:mt-10 max-md:ml-0.5">Todas tus Promociones</h2>
      <div className="flex flex-col items-start self-center pt-4 pr-5 pb-7 pl-2.5 mt-4 w-full text-xl font-bold tracking-wider leading-none uppercase rounded-2xl bg-slate-700 bg-opacity-50 max-w-[1204px] text-slate-700 max-md:max-w-full">
        {promotions.map((promotion, index) => (
          <div key={index} className="flex flex-wrap gap-3 w-full max-w-[980px] max-md:max-w-full">
            <div className="px-16 py-3 text-lg tracking-wider leading-none bg-white rounded-md max-md:px-5">
              <span className="text-xl">{promotion.name}</span>
            </div>
            <div className="px-14 py-3 whitespace-nowrap bg-white rounded-md max-md:px-5">{promotion.date}</div>
            <div className="px-10 py-3 whitespace-nowrap bg-white rounded-md max-md:px-5">{promotion.time}</div>
            <div className="px-16 py-3 whitespace-nowrap bg-white rounded-md max-md:px-5">EDITAR</div>
          </div>
        ))}
        <button className="px-11 py-5 my-auto whitespace-nowrap bg-white rounded-3xl max-md:px-5">AGREGAR</button>
      </div>
    </section>
  );
};

const MenuList = ({ menuItems }) => {
  return (
    <section>
      <h2 className="self-start mt-20 text-xl font-medium leading-snug text-slate-600 max-md:mt-10 max-md:ml-0.5">TU MENU</h2>
      <div className="flex flex-col items-start self-center pt-4 pr-5 pb-7 pl-2.5 mt-5 w-full text-xl font-bold tracking-wider leading-none uppercase rounded-2xl bg-slate-700 bg-opacity-50 max-w-[1204px] text-slate-700 max-md:max-w-full">
        {menuItems.map((item, index) => (
          <div key={index} className="flex flex-wrap gap-3 w-full max-w-[980px] max-md:max-w-full">
            <div className="px-16 py-3 text-lg tracking-wider leading-none bg-white rounded-md max-md:px-5">
              <span className="text-xl">{item.name}</span>
            </div>
            <div className="px-16 py-3 whitespace-nowrap bg-white rounded-md max-md:px-5">{item.date}</div>
            <div className="px-14 py-3 whitespace-nowrap bg-white rounded-md max-md:px-5">{item.time}</div>
            <div className="px-16 py-3 whitespace-nowrap bg-white rounded-md max-md:px-5">EDITAR</div>
          </div>
        ))}
        <button className="px-11 py-5 my-auto whitespace-nowrap bg-white rounded-3xl max-md:px-5">AGREGAR</button>
      </div>
    </section>
  );
};

const VisitorChart = ({ events }) => {
  return (
    <section className="flex flex-col self-center mt-20 max-w-full rounded-lg w-[704px] max-md:mt-10">
      <div className="flex flex-col justify-center p-5 w-full bg-white rounded-lg border border-gray-100 border-solid shadow-lg max-w-[704px] max-md:max-w-full">
        <h2 className="flex gap-10 items-center self-start text-xl font-medium leading-snug text-gray-700">
          <div className="flex gap-4 items-center self-stretch my-auto min-w-[240px]">
            <img loading="lazy" src="http://b.io/ext_16-" alt="" className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square" />
            <div className="self-stretch my-auto">Cuantas personas visitaron tu perfil</div>
          </div>
        </h2>
        <div className="mt-6 w-full rounded-none">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center mr-0 text-xs font-semibold text-neutral-500 max-md:max-w-full">
                <div className="flex flex-col justify-center items-end w-full max-w-[664px] max-md:max-w-full">
                  <div className="flex flex-col justify-center items-end leading-none whitespace-nowrap max-md:max-w-full">
                    {[100, 75, 50, 25, 0].map((value, index) => (
                      <div key={index} className="flex flex-wrap gap-2 items-end mt-10 max-md:max-w-full">
                        <div>{value}</div>
                        <div className="shrink-0 h-px border border-dashed bg-neutral-400 border-neutral-400 min-w-[240px] w-[624px]" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-8 justify-between items-center mt-4 max-w-full leading-snug w-[616px]">
                    {events.map((event, index) => (
                      <div key={index} className="self-stretch my-auto">{event}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <img loading="lazy" src="http://b.io/ext_17-" alt="Visitor chart" className="object-contain mt-5 w-full rounded-none aspect-[3.29] max-md:max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const View22 = () => {
  const profileData = {
    name: 'nombre',
    rating: '4.5',
    comments: [
      'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones',
      'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones'
    ]
  };

  const carouselImages = [
    "http://b.io/ext_18-", "http://b.io/ext_19-", "http://b.io/ext_20-", "http://b.io/ext_21-"];

  const events = [
    { name: "EVENTO", date: "31-12-25", time: "22:00-02:00" },
    { name: "EVENTO", date: "FECHA", time: "HORARIO" },
    { name: "EVENTO", date: "FECHA", time: "HORARIO" },
    { name: "EVENTO", date: "FECHA", time: "HORARIO" }
  ];

  const promotions = [
    { name: "PROMOCION", date: "31-12-25", time: "22:00-02:00" },
    { name: "PROMOCION", date: "FECHA", time: "HORARIO" },
    { name: "PROMOCION", date: "FECHA", time: "HORARIO" },
    { name: "PROMOCION", date: "FECHA", time: "HORARIO" }
  ];

  const menuItems = [
    { name: "PLATILLO", date: "01-31", time: "22:00-02:00" },
    { name: "PLATILLO", date: "FECHA", time: "HORARIO" },
    { name: "PLATILLO", date: "FECHA", time: "HORARIO" },
    { name: "PLATILLO", date: "FECHA", time: "HORARIO" }
  ];

  const chartEvents = ["¡Celebra México!", "Día de muertos", "Haloween with Pride", "New Year", "Carnival with Pride", "Pride 2023"];

  return (
    <div className="flex overflow-hidden flex-col pb-16 bg-white">
      <Header />
      <div className="flex flex-col pl-20 mt-5 w-full max-md:pl-5 max-md:max-w-full">
        <div className="self-end w-full max-w-[1063px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[84%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-5 w-full max-md:mt-10 max-md:max-w-full">
                <div className="self-center text-6xl font-bold leading-none text-slate-700 max-md:text-4xl">
                  ¡Bienvenido!
                </div>
                <div className="mt-14 max-md:mt-10 max-md:max-w-full">
                  <ProfileSection {...profileData} />
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[16%] max-md:ml-0 max-md:w-full">
              <SideMenu />
            </div>
          </div>
        </div>
        <ImageCarousel images={carouselImages} />
        <EventList events={events} />
        <PromotionList promotions={promotions} />
        <MenuList menuItems={menuItems} />
        <VisitorChart events={chartEvents} />
      </div>
    </div>
  );
};

export default View22;