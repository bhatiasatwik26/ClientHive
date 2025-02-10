import React from 'react'

const CallNotif = () => {
  return (
    <div className='w-72 shadow-xl rounded-lg pointer-events-auto bg-[#1d2437] border-2 border-[#dd1d5d] transition-all duration-300 hover:shadow-2xl'>
      <div className="p-3 flex flex-col items-center justify-between gap-2">
        <h1 id='font1' className='text-lg font-medium text-white'>
          Incoming call from satwik
        </h1>
        <div className='flex items-center justify-center gap-6 w-full'>
          <button 
            onClick={() => toast.dismiss(t.id)} 
            className='px-4 py-1 rounded-md font-medium bg-[#dd1d5d] text-[#1d2437] hover:bg-[#222a3fab] hover:text-[#dd1d5d]  duration-200 ease-out'
          >
            Accept
          </button>
          <button 
            onClick={() => toast.dismiss(t.id)} 
            className='px-4 py-1 rounded-md font-medium text-[#dd1d5d] border border-[#dd1d5d] hover:bg-[#dd1d5d] hover:text-[#1d2437] duration-150'
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallNotif