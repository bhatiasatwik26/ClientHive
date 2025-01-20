    import  { useState, useEffect } from 'react';
import { MdPersonAdd } from "react-icons/md";
const Modal = ({ setShowModal }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [chatexists, setChatexists] = useState(false);

    const fetchallUsers = async () => {
        if (searchTerm) {
            const response = await fetch(`${import.meta.env.VITE_API_PATH}/api/user`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search: searchTerm })
            });

            const res = await response.json();
            console.log(res);
            setResults(res.data);
        } else {
            setResults([]); 
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setChatexists(false);
    };

    useEffect(() => {
        fetchallUsers();
    }, [searchTerm]);

    const addToChat = async(result) => {
        console.log(result);
        
        const res = await fetch(`${import.meta.env.VITE_API_PATH}/api/chat/create/${result._id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        console.log(data);
        if(data.success==false){
            setChatexists(true);
        }     
    }

    return (
        <div onClick={() => setShowModal(false)} className="fixed top-0 left-0 w-full h-full bg-[#1d2437] bg-opacity-60 flex items-start justify-center z-50 p-20">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-gray-50 p-2 rounded-lg shadow-lg w-[90%] max-w-md">
                <div className={`flex items-center transition-all duration-300 ease-in-out  ${isExpanded ? 'w-full' : 'w-full'}`}>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search here..."
                        className="p-2 border-b-2 outline-none bg-gray-50 focus:border-[#dd1d5d] w-full"
                        onFocus={() => setIsExpanded(true)}
                        onBlur={() => setIsExpanded(false)}
                        onChange={handleSearchChange}
                        value={searchTerm}
                    />
                </div>
                <div className="mt-4 max-h-[300px] overflow-y-auto scrollbar-hide "> 
                {chatexists && (<p className="text-red-600 text-lg font-medium mt-2">Chat already exists with this user.</p>)}
                    {results.length === 0 && searchTerm && (
                        <p id='noResult' className='text-xl font-chakra-fetch ml-32'></p>
                    )}
                    {results.map((result, index) => (
                        <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer gap-2 flex items-center justify-between">
                            <p id='result' className='text-sm'>{result.username || result.email}</p>
                            <MdPersonAdd onClick={()=>addToChat(result)}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
