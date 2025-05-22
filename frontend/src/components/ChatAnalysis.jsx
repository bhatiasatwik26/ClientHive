import { useDispatch, useSelector } from "react-redux";
import { setChatAnalyticsOpen } from "../../utils/utilSlice";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);


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
        console.log(res.data);
    };

    if (!chatData) return <div className="flex items-center justify-center w-full h-full text-white">Loading...</div>;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-[90%] h-[90%] overflow-y-auto">
                <h2 id="font1" className="text-xl font-bold mb-4 capitalize">Chat Analysis</h2>
            
            
            <div className="flex-col items-center justify-between mb-4">
            <div className="flex flex-wrap justify-between gap-6 mb-8">
            {/* Bar Chart: Messages by User */}
            <div className="flex-1 min-w-[300px] max-w-[48%] bg-gray-800 p-4 rounded-lg">
                <h3 id="font3" className="text-lg font-semibold mb-2">Messages by User</h3>
                <div className="h-64">
                <Bar 
                    data={{
                    labels: Object.keys(chatData.messages_by_user).map(userId =>
                        selectedChat.users.find(user => user._id === userId)?.username || userId
                    ),
                    datasets: [{
                        label: 'Messages',
                        data: Object.values(chatData.messages_by_user),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    }],
                    }}
                    options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                    },
                    }}
                />
                </div>
            </div>

            {/* Doughnut Chart: Most Active Day */}
            <div className="flex-1 min-w-[300px] max-w-[48%] bg-gray-800 p-4 rounded-lg">
                <h3 id="font3" className="text-lg font-semibold mb-2">Most Active Day</h3>
                <div className="h-64 flex items-center justify-center">
                <Doughnut 
                    data={{
                    labels: chatData.most_active_day.day_name,
                    datasets: [{
                        label: 'Messages',
                        data: chatData.most_active_day.day_msg_count,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    }],
                    }}
                    options={{ responsive: true }}
                />
                </div>
            </div>
            </div>

            <div className="flex flex-wrap justify-between gap-6 mb-8">
            {/* Horizontal Bar Chart: Most Common Words */}
            <div className="flex-1 min-w-[300px] max-w-[48%] bg-gray-800 p-4 rounded-lg">
                <h3 id="font3" className="text-lg font-semibold mb-2">Most Common Words</h3>
                <div className="h-64">
                <Bar 
                    data={{
                    labels: chatData.most_common_words.word,
                    datasets: [{
                        label: 'Frequency',
                        data: chatData.most_common_words.count,
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    }],
                    }}
                    options={{
                    responsive: true,
                    indexAxis: 'y',
                    plugins: {
                        legend: { display: false },
                    },
                    }}
                />
                </div>
            </div>

            {/* Line Chart: Monthly Timeline */}
            {chatData.monthly_timeline && (
                <div className="flex-1 min-w-[300px] max-w-[48%] bg-gray-800 p-4 rounded-lg">
                <h3 id="font3" className="text-lg font-semibold mb-2">Monthly Timeline</h3>
                <div className="h-64">
                    <Line 
                    data={{
                        labels: chatData.monthly_timeline.time,
                        datasets: [{
                        label: 'Messages per Month',
                        data: chatData.monthly_timeline.message,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.4,
                        }],
                    }}
                    options={{ responsive: true }}
                    />
                </div>
                </div>
            )}
            </div>

            </div>

                <div className="flex justify-between items-center mt-4">
                    <span id="font3" className="text-gray-400">Total Messages: {chatData.total_messages}</span>
                    <span id="font3" className="text-gray-400">Total Words: {chatData.total_words}</span>
                </div>

            <div className="flex justify-center w-full">
                <button 
                    onClick={() => dispatch(setChatAnalyticsOpen(false))} 
                    className="mt-4 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-800 ">
                    Close Analysis
                </button>
            </div>
            </div>
        </div>
    );
};

export default ChatAnalysis;
