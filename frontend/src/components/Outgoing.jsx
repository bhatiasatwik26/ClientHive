import React from 'react'

const Outgoing = ( {msg, img} ) => {
  return (
    <div className='max-w-[70%] bg-[#dd1d5d8f] py-2 px-3 rounded-s-2xl rounded-tr-2xl self-end text-white text-right flex flex-col'>
      {img && <img src={img} alt='img' className='w-[200px] h-[200px] rounded-xl'/>}
      <p className='text-white text-left break-words overflow-hidden relative'>
        {msg}
        </p>
    </div>
  )
}

export default Outgoing