

const Outgoing = ({msg , img}) => {
  return (
    <div className='max-w-[70%] bg-[#dd1d5d80] p-2 rounded-s-2xl rounded-tr-2xl self-end text-white text-right flex flex-col'>
      {img && <img src={img} alt='img' className='w-[200px] h-[200px] rounded-xl'/>}
      <p className='text-white text-left break-words overflow-hidden '>
        {msg}
       </p>
    </div>
  )
}

export default Outgoing