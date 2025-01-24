import React, { useEffect } from 'react'
import { isCallModalOpen } from '../../utils/utilSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { resetSlice } from '../../utils/callSlice.js'
import { UseSocket } from '../hooks/UseSocket.jsx'

const ChatAnalysis = () => {

  const {listenToCallEvents, clearCallEvents} = UseSocket()
 

  const dispatch = useDispatch()
  const CallData = useSelector(state=>state.Call.call);

  

  return (
    <div className='h-[100%] w-[100%] absolute top-0 left-0 bg-red-600 z-50 flex flex-col items-center justify-center'>
      <div className='w-full h-[80%] flex items-center justify-center p-10 gap-10'>
        <div className='w-[50%] h-full bg-green-400 rounded-lg'></div>
        <div className='w-[50%] h-full bg-yellow-400 rounded-lg'></div>
      </div>
      <div className='w-full h-[20%] flex items-center justify-center gap-10 bg-orange-500'>
        <p>mic</p>
        <p>cam</p>
        <p onClick={()=>dispatch(isCallModalOpen(false))}>dis</p>
      </div>
    </div>
  )
}

export default ChatAnalysis