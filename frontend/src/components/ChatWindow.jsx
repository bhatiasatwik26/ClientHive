import React from 'react'
import Chatlist from './Chatlist'
import { Chat } from './Chat'

const ChatWindow = () => {
  return (
    <div className='flex items-center justify-between w-full h-full rounded-xl overflow-hidden gap-1'>
        <Chatlist />
        <Chat />
    </div>
  )
}

export default ChatWindow