const Outgoing = ({msg, img, currUserPhoto}) => {
  return (
    <div className="w-full flex flex-row-reverse items-end gap-2 ">
      <div className="w-6 h-6 ">
        <img 
          src={currUserPhoto} 
          alt='profile' 
          className='rounded-full w-full h-full object-cover'
        />
      </div>
      <div id="font2" className='max-w-[60%] bg-[#dd1d5da0] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl self-end text-white flex flex-col gap-2'>
        {img && 
          <div className="w-full max-w-[200px] h-[200px] rounded-t-2xl overflow-hidden pt-1">
            <img 
              src={img} 
              alt='img' 
              className='w-full h-full rounded-t-2xl rounded-s-2xl object-cover'
            />
          </div> 
        }
        <p className='text-white break-words leading-snug tracking-wide px-3 py-2'>
          {msg}
        </p>
      </div>
      
    </div>
  )
}

export default Outgoing