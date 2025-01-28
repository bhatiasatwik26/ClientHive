    import  { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { MdPersonAdd } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setSelectedChat } from '../../utils/chatSlice';
const Modal = ({ setShowModal,socket }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [chatexists, setChatexists] = useState(false);

    const dispatch = useDispatch();

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
        
        const res = await fetch(`${import.meta.env.VITE_API_PATH}/api/chat/create/${result._id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        
        if(data.success==false){
            toast.error("Chat already exixts!", {duration: 1500});
        }
        else{
            toast.success("New chat created.");
            socket.emit('AddChat',data.data)
            dispatch(setSelectedChat(data.data));
            setShowModal(false);
        }     
        console.log(data.data);
    }

    return (
        <div onClick={() => setShowModal(false)} className="fixed top-0 left-0 w-full h-full bg-[#0c0f16] bg-opacity-[95%] flex items-start justify-center z-50 pt-[5%] cursor-no-drop">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-[#1d2437] p-2 rounded-lg shadow-lg w-[90%] max-w-lg  border-[#dd1d5d79] cursor-default">
                <div className={`flex items-center transition-all duration-300 ease-in-out ${isExpanded ? 'w-full' : 'w-full'}`}>
                    <input
                        type="text"
                        id="font1"
                        spellCheck="false"
                        placeholder="Search here..."
                        className="px-4 py-2 text-lg tracking-wider outline-none bg-transparent  text-white border-b-2 border-[#dd1d5d79]  w-full"
                        onFocus={() => setIsExpanded(true)}
                        onBlur={() => setIsExpanded(false)}
                        onChange={handleSearchChange}
                        value={searchTerm}
                    />
                </div>
                <div className="mt-4 max-h-[300px] overflow-y-auto scrollbar-hide "> 
                {chatexists && (
                    <p className="text-red-600 text-lg mt-2 mb-5 text-center">
                        Chat already exists with this user.
                    </p>
                )}
                    { !results  && (
                        <p id='noResult' className='text-lg text-red-500 pl-2 text-center'>
                            Error fetching results.
                        </p>
                    )}
                    { results && results.length === 0 && searchTerm && (
                        <p id='noResult' className='text-lg text-red-500 pl-2 text-center'>
                            Hmmm... couldn't find anything.
                        </p>
                    )}
                    {results && results.map((result, index) => (
                        <div key={index} onClick={()=>addToChat(result)} className=" pl-4  bg-[#222a3f] cursor-pointer  flex items-center justify-between mb-4 rounded-lg hover:scale-[99%] duration-150 ease-in-out hover:shadow-inner">
                                <p id='font2' className='font-medium text-base text-[#dd1d5d] capitalize w-[25%]'>
                                    {result.username}
                                </p>
                                <p id='font3' className='text-sm font-light text-[#ffffff6c] w-[35%]'>
                                    [ {result.email} ]
                                </p>
                            <img src={result.photo} alt="user-photo" className='w-[50px] h-[50px] rounded-md object-cover'/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
