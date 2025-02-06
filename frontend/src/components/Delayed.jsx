

const Delayed = ({msg , img}) => {
    return (
      <div id="font2" className='max-w-[55%] bg-[#dd1d5d00] rounded-s-xl rounded-br-xl self-end text-[#dd1d5da0] flex flex-col-reverse justify-between items-center py-1 px-1 border-2 border-dashed border-[#dd1d5da0]'>
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
        <p className='text-[#ffffff8e] text-justify break-words overflow-hidden leading-snug tracking-wide px-2 py-2'>
          {msg}
         </p>
      </div>
    )
  }
  
  export default Delayed