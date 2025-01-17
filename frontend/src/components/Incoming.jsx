import React from 'react'

const Incoming = ( {msg, img} ) => {
  return (
    <div className='max-w-[70%] bg-[#1d2437] p-2 rounded-e-2xl rounded-tl-2xl self-start  '>
      {img && <img src={img} alt='img' className='w-[200px] h-[200px] rounded-xl'/>}
      <p className='text-white text-left break-words overflow-hidden '>
        {msg}
       </p>
    </div>
  )
}

export default Incoming