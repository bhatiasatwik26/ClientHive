

const Incoming = ({msg , img, type}) => {
  return (
    <div id="font2" className='max-w-[70%] bg-[#1d2437] px-2 py-1 rounded-e-3xl rounded-tl-3xl self-start text-white text-justify flex flex-col justify-between gap-2 items-center'>
      {img && 
        <div className=" w-[200px] h-[200px] rounded-t-2xl overflow-hidden pt-1">
          <img src={img} alt='img' 
          className='w-full h-full rounded-t-2xl rounded-e-2xl object-cover'/>
        </div> 
      }
      <p className={`text-white text-justify break-words overflow-hidden leading-snug tracking-wide px-3 py-1 ${type ? 'text-[20px] text-[#ffffff65]' : ''}`}>
        {msg}
       </p>
    </div>
  )
}

export default Incoming