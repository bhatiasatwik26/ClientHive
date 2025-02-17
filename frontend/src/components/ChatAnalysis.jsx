import { useDispatch, useSelector } from "react-redux";
import { setChatAnalyticsOpen } from "../../utils/utilSlice";
import { useEffect, useState } from "react";

const ChatAnalysis = () => {
    const dispatch = useDispatch();
    const currUser = useSelector(state => state.CurrUser.user._id);
    const currUsername = useSelector(state => state.CurrUser.user.username);
    const selectedChat = useSelector(state => state.Chat.chats.selectedChat);
    const chatUser = selectedChat.users.filter(user => user._id !== currUser);
    const chatName = chatUser[0].username;
    const [chatData, setChatData] = useState(null);

    useEffect(() => {
        fetchChatAnalysis();
    }, []);

    const fetchChatAnalysis = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_PATH}/api/analyze-chat`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user1: currUser, user2: chatUser[0]._id })
        });
        const res = await response.json();
        setChatData(res.data);
    };

    if (!chatData) return <div className="flex items-center justify-center w-full h-full text-white">Loading...</div>;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-4/5 max-w-3xl">
                <h2 className="text-xl font-bold mb-4">Chat Analysis</h2>
                
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Messages by User</h3>
                    <ul className="list-disc list-inside text-gray-300">
                    {Object.entries(chatData.messages_by_user).map(([userId, count]) => {
                            const username = selectedChat.users.find(user => user._id === userId)?.username || userId;
                            return <li key={userId}>User {username}: {count} messages</li>;
                        })}
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Most Active Day</h3>
                    <p>{chatData.most_active_day.day_name[chatData.most_active_day.day_msg_count.indexOf(Math.max(...chatData.most_active_day.day_msg_count))]}</p>
                </div>
                
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Most Common Words</h3>
                    <ul className="list-disc list-inside text-gray-300">
                        {chatData.most_common_words.word.slice(0, 5).map((word, index) => (
                            <li key={index}>{word}: {chatData.most_common_words.count[index]} times</li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-400">Total Messages: {chatData.total_messages}</span>
                    <span className="text-gray-400">Total Words: {chatData.total_words}</span>
                </div>

                <button 
                    onClick={() => dispatch(setChatAnalyticsOpen(false))} 
                    className="mt-4 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
                    Close Analysis
                </button>
            </div>
        </div>
    );
};

export default ChatAnalysis;
