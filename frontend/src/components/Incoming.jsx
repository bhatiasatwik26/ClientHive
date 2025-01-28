const Incoming = ({msg, img, type, chatPhoto}) => {
  return (
    <div className="max-w-[70%] flex flex-row-reverse items-end gap-2 mr-auto">
      <div id="font2" className='max-w-[70%] bg-[#1d2437] rounded-tl-3xl rounded-tr-3xl rounded-br-3xl self-start text-white flex flex-col gap-2'>
        {img && 
          <div className="w-full max-w-[200px] h-[200px] rounded-t-2xl overflow-hidden">
            <img 
              src={img} 
              alt='img' 
              className='w-full h-full object-cover'
            />
          </div> 
        }
        <p className={`text-white break-words leading-snug tracking-wide px-3 py-2 ${type ? 'text-[20px] text-[#ffffff65]' : ''}`}>
          {msg}
        </p>
      </div>
      <div className="w-6 h-6 ">
        <img 
          src={chatPhoto} 
          alt='profile'
          className='rounded-full w-full h-full object-cover'
        />
      </div>
    </div>
  )
}

export default Incoming