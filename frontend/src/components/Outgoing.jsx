const Outgoing = ({msg, img, currUserPhoto}) => {
  return (
<<<<<<< HEAD
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
      
=======
    <div id="font2" className='max-w-[55%] bg-[#dd1d5da0] rounded-s-xl rounded-br-xl self-end text-white flex flex-col-reverse justify-between items-center py-1 px-1'>
      {img && 
        <a href={img} target="_blank" rel="noopener noreferrer">
        <div className="w-[200px] h-[200px] overflow-hidden rounded-b-xl cursor-pointer">
          <img 
            src={img} 
            alt="img" 
            className="w-full h-full object-cover rounded-b-xl rounded-t-lg" 
          />
        </div>
      </a>     
      }
      <p className='text-white text-justify break-words overflow-hidden leading-snug tracking-wide px-2 py-2'>
        {msg}
       </p>
>>>>>>> 9a0df6b6f13e01e6b820336100ce0574bf4475bc
    </div>
  )
}

export default Outgoing