

export default function CardPremium() {
  return (
    <div className='flex flex-col justify-center w-full h-full md:p-8 lg:p-14'>
      <div className='w-full mt-4 flex flex-col justify-center items-center'>
        <p className='text-[#2F4F4F] text-[20px] md:text-[40px] lg:text-[56px] text-center font-semibold'>
          ¡AccessGo!
        </p>
        <img
          className='w-[236px] h-[300px] md:w-[623px] md:h-[250px] lg:w-[652px] lg:h-[250px] mt-8'
          src='/img-card.png'
          alt=''
        />
      </div>

      <section className='flex flex-col md:flex-row lg:flex-row w-full mt-4 md:mt-10 lg:mt-16'>
        <div className='md:w-2/3 lg:w-2/3'>
          <p className='w-full h-[40px] text-[#7E952A] text-[20px] md:text-2xl lg:text-3xl font-semibold'>
            Cielito querido
          </p>
          <div className='flex flex-rows ml-2 mb-2 '>
            <img
              className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
              src='/estrellita.svg'
              alt=''
            />
            <img
              className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
              src='/estrellita.svg'
              alt=''
            />
            <img
              className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
              src='/estrellita.svg'
              alt=''
            />
            <img
              className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
              src='/estrellita.svg'
              alt=''
            />
            <img
              className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
              src='/estrellita.svg'
              alt=''
            />
          </div>

          <p className='w-full text-sm text-[#455A64] lg:text-lg mt-2'>
            CIELITO ® es un refugio único que inspirado en nuestra historia y
            calidez latina, reinventa la experiencia de tomar café...
          </p>
        </div>

        <div>
          <p className='text-[10.5px] md:text-[12px] lg:text-sm text-[#607D8B] ml-2 mt-2'>
            Horarios
          </p>

          <div className='flex flex-row mt-2'>
            <img
              className='w-[20px] h-[14px]'
              src='calendarVector.png'
              alt=''
            />
            <p className='text-[12px] md:text-sm lg:text-base text-[#546E7A] ml-2'>
              D, L, Ma, Mi, J, V, S
            </p>
          </div>

          <div className='flex flex-row mt-2'>
            <img
              className='w-[20px] h-[14px] md:w-[22px] md:h-[16] lg:w-[22px] lg:h-[18px]'
              src='clockOpeningVector.png'
              alt=''
            />
            <p className='text-[12.6px] md:text-sm md:text[13.5px] text-[#546E7A] ml-2'>
              01:00PM
            </p>
          </div>

          <div className='flex flex-row mt-2'>
            <img
              className='w-[20px] h-[14px md:w-[22px] md:h-[16] lg:w-[22px] lg:h-[18px]]'
              src='clockClosingVector.png'
              alt=''
            />
            <p className='text-[12.6px] text-[#546E7A] md:text-sm md:text[13.5px] ml-2'>
              12:00AM
            </p>
          </div>
        </div>
      </section>

      <div className='w-full flex flex-col justify-center items-center mt-8 md:mt-12 lg:mt-16'>
        <select className='rounded-lg bg-gray-400 mt-4' name='' id=''>
          <option value='Place'>Juarez 6600 Ciudad de Mexico</option>
        </select>

        <div className='w-[200px] h-[40px] md:w-[220px] md:h-[45px] lg:w-[250px] lg:h-[50px] mt-6 flex justify-center items-center self-center border border-gray-800 rounded-2xl '>
          <img
            className='mx-4 w-[22px] h-[25px] md:w-[25px] md:h-[28px] lg:w-[28px] lg:h-[30px]'
            src='iconsBlue/motorDisabilityIcon.png'
            alt=''
          />
          <img
            className='mx-4 w-[22px] h-[25px] md:w-[25px] md:h-[28px] lg:w-[28px] lg:h-[30px]'
            src='iconsBlue/blindIcon.png'
            alt=''
          />
          <img
            className='mx-4 w-[22px] h-[25px] md:w-[25px] md:h-[28px] lg:w-[28px] lg:h-[30px]'
            src='iconsBlue/signalIcon.png'
            alt=''
          />
          <img
            className='mx-4 w-[22px] h-[25px] md:w-[25px] md:h-[28px] lg:w-[28px] lg:h-[30px]'
            src='iconsBlue/neuroDicon.png'
            alt=''
          />
        </div>
      </div>

      <section className='w-full flex flex-col mt-6'>
        <p className='text-2xl lg:text-3xl text-[#7E952A] text-center'>
          ¡Este mes para ti!
        </p>

        <div className='grid grid-cols-4 justify-center items-center mt-8 md:mt-12 lg:mt-16'>
          <img
            className='col-start-2 col-end-3 place-self-end  w-[79px] h-[72px] rounded-lg'
            src='raultemporaryImages/promoImg.png'
            alt=''
          />
          <p className='col-start-3 col-end-4 text-sm ml-4'>Promocion</p>
        </div>
        <p className='text-xs lg:text-base text-center mt-6'>
          solo este mes las mejores promociones para ti
        </p>

        <div className='grid grid-cols-4 justify-center items-center mt-8 md:mt-12 lg:mt-16'>
          <img
            className='col-start-2 col-end-3 place-self-end w-[79px] h-[72px] rounded-lg'
            src='raultemporaryImages/offerImg.png'
            alt=''
          />
          <p className='col-start-3 col-end-4 text-sm ml-4'>Oferta</p>
        </div>
        <p className='text-sm lg:text-base text-center mt-6'>
          solo este mes las mejores promociones para ti
        </p>

        <div className='grid grid-cols-4 justify-center items-center mt-8 md:mt-12 lg:mt-16'>
          <img
            className='col-start-2 col-end-3 place-self-end w-[79px] h-[72px] rounded-lg'
            src='raultemporaryImages/menuImg.png'
            alt=''
          />
          <p className='col-start-3 col-end-4 text-sm ml-4'>Menu</p>
        </div>
        <p className='text-sm lg:text-base text-center mt-6'>
          solo este mes las mejores promociones para ti
        </p>
      </section>

      <section className='w-full h-full mt-6 flex flex-col '>
        <button
          className='p-0 w-[196px] h-[28px] md:w-[210px] md:h-[36px] lg:w-[240px] lg:h-[44px] bg-[#2F4F4F] rounded-full text-sm md:text-base lg:text-lg text-center text-white self-center'
          href=''
        >
          Dejar un comentario
        </button>

        <div className='w-full border rounded-lg mt-6'>
          <div className='flex flex-row items-center'>
            <img
              className='w-[37px] h-[45px] md:w-[42px] md:h-[50px] lg:w-[48px] lg:h-[55px] rounded-full p-1'
              src='jhonDoe.png'
              alt=''
            />
            <p className='text-center md:text-base lg:text-lg'>Jhon Doe</p>
            <div className='flex flex-rows ml-2 mb-2 '>
              <img
                className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
                src='/estrellita.svg'
                alt=''
              />
              <img
                className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
                src='/estrellita.svg'
                alt=''
              />
              <img
                className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
                src='/estrellita.svg'
                alt=''
              />
              <img
                className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
                src='/estrellita.svg'
                alt=''
              />
              <img
                className='w-[15px] h-[20px] md:w-[18px] md:h-[23px] lg:w-[20px] lg:h-[25px]'
                src='/estrellita.svg'
                alt=''
              />
            </div>
          </div>
          <p className='p-4 bg-gray-300 rounded-lg md:text-base lg:text-lg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            assumenda consequuntur sint exercitationem ipsam, inventore
            obcaecati voluptas nulla cupiditate alias tempora eligendi sequi
            accusantium, ad sed odio saepe natus consectetur.
          </p>
        </div>
      </section>
    </div>
  );
}
