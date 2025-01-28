

const Outgoing = ({msg , img}) => {
  return (
    <div id="font2" className='max-w-[70%] bg-[#dd1d5da0] px-2 py-1 rounded-s-3xl rounded-tr-3xl self-end text-white text-justify flex flex-col justify-between gap-2 items-center'>
      {img && 
        <div className=" w-[200px] h-[200px] rounded-t-2xl overflow-hidden pt-1">
          <img src={img} alt='img' 
          className='w-full h-full rounded-t-2xl rounded-s-2xl object-cover'/>
        </div> 
      }
      <p className='text-white text-justify break-words overflow-hidden leading-snug tracking-wide px-3 py-1'>
        {msg}
       </p>
    </div>
  )
}

export default Outgoing