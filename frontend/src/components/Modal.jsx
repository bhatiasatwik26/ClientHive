import React, { useState, useEffect } from 'react';
const Modal = ({ setShowModal }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    useEffect(() => {
        if (searchTerm) {
            const fakeDatabase = [
                'Alice',
                'Bob',
                'Charlie',
                'David',
                'Eve',
                'Frank',
                'Grace',
                'Heidi',
                'aman',
                'John',
                'John Doe',
                'Jane',
                'Jane Doe',
                'Joe',
                'Joe Doe',
                'Judy',
                'Alice',
                'Bob',
                'Charlie',
                'David',
                'Eve',
                'Frank',
                'Grace',
                'Heidi',
                'aman',
                'John',
                'John Doe',
                'Jane',
                'Jane Doe',
                'Joe',
                'Joe Doe',
                'Judy',
            ];
            const filteredResults = fakeDatabase.filter((name) =>
                name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        } else {
            setResults([]);
        }
    }, [searchTerm]);

    return (
        <div onClick={() => setShowModal(false)} className="fixed top-0 left-0 w-full h-full bg-[#1d2437] bg-opacity-60 flex items-start justify-center z-50 p-20">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-gray-50 p-2 rounded-lg shadow-lg w-[90%] max-w-md">
                <div className={`flex items-center transition-all duration-300 ease-in-out ${isExpanded ? 'w-full' : 'w-full'}`}>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search here..."
                        className="p-2 border-b-2  outline-none bg-gray-50 focus:border-[#dd1d5d] w-full"
                        onFocus={() => setIsExpanded(true)}
                        onBlur={() => setIsExpanded(false)}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
                <div className="mt-4 max-h-[300px] overflow-y-auto scrollbar-hide ">
                    {results.length === 0 && searchTerm && (
                        <p id='noResult' className='text-xl font-chakra-fetch ml-32'>No results found</p>
                    )}
                    {results.map((result, index) => (
                        <div key={index}  className="p-2  hover:bg-gray-100 cursor-pointer gap-2 ">
                            <p id='result' className=' text-sm '>{result}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
