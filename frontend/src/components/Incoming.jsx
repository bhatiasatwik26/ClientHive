

const Incoming = ({msg , img}) => {
  return (
    <div id="font2" className='max-w-[55%] bg-[#1d2437] rounded-e-xl rounded-bl-xl self-start text-white flex flex-col-reverse justify-between items-center py-1 px-1'>
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
    </div>
  )
}

export default Incoming