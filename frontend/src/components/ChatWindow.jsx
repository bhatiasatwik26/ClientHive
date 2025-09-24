import React, { useEffect } from 'react'
import Chatlist from './Chatlist'
import { Chat } from './Chat'
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import { LiaHandPointLeft } from "react-icons/lia";
import motivations from '../../utils/motivation.json';

const ChatWindow = ({ socket }) => {
    const selectedChat = useSelector(state => state.Chat.chats.selectedChat);
    const [quote, setQuote] = React.useState({ quote: 'Your daily dose of motivation is on its way..... ', author: 'Anonymous' });

    useEffect(() => {
        const loadLocalQuote = () => {
            try {
                const randomIndex = Math.floor(Math.random() * motivations.motivations.length);
                const randomQuote = motivations.motivations[randomIndex];
                setQuote({ quote: randomQuote, author: 'Anonymous' });
            } catch (error) {
                console.error('Error loading local quote:', error);
            }
        };

        loadLocalQuote();
    }, []);

    return (
        <div className='flex items-center justify-between w-full h-full rounded-xl overflow-hidden gap-1'>
            <Chatlist />
            {selectedChat ?
                <Chat socket={socket} /> :
                <div className='h-full flex flex-1 flex-col items-center justify-start pt-[10%] bg-[#222a3f] pb-1 gap-1 mx-auto'>
                    <img src={logo} alt="logo" className='h-[250px] w-[250px]' />
                    <div id='font3' className='text-[#dd1d5d] text-2xl font-medium -mt-14'>
                        <div className='flex justify-center items-center flex-col gap-4 max-w-[800px] text-center'>
                            {quote && <div className='flex items-end justify-start gap-1 tracking-wide'>
                                <p id='font3 font-sm'>'{quote.quote}'</p>
                            </div>}
                            <div className='text-xl font-normal text-[#ffffff42] flex items-center justify-center gap-2'>
                                <LiaHandPointLeft />
                                <p id='font2 font-sm'>
                                    Select a chat to proceed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ChatWindow
