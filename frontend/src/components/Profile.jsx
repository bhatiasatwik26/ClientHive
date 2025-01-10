import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../utils/userSlice';

const Profile = () => {
    const user = useSelector(state=>state.CurrUser.user);
    const {photo, _id, type, username, email, description} = user;
    const ref = useRef(null);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const dispatch = useDispatch();

    const handleDataChange = (e) => {
        setUpdateData({...updateData, [e.target.id]: e.target.value});
    }
    const updateProfile = async () => {
        setLoading(true);
        setError(null);
        const res = await fetch(`${import.meta.env.VITE_API_PATH}/api/user/update/${_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(updateData)
        });
        const data = await res.json();
        setLoading(false);
        if(data.sucess === false)
            setError(data.message);
        dispatch(updateUser(data.data));
    }
    const handlePhotoChange = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        try{
            reader.readAsDataURL(file);
            reader.onload = () => {
                setUpdateData({...updateData, photo: reader.result});
            }
        }
        catch(err){
            setError('Error in selecting photo');
            console.log(err);
        }
    }
    return (
        <div className='h-full flex flex-col items-center justify-start bg-[#eaebed] p-10 rounded-3xl'>
            <div className=' w-[100%] h-[100%] rounded-3xl overflow-hidden'>
                <div className='w-full h-[30vh] p-4 relative mb-20'>
                    <img src="https://images.unsplash.com/photo-1707175834429-dcfdf423e2ae?q=80&w=2320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='h-full w-full rounded-3xl object-cover object-top'/>
                    <div className='absolute w-full h-fit bottom-0 translate-y-[35%]
                    translate-x-[3%] left-0 flex p-1 pl-4 items-end gap-2'>
                        <img src={photo} alt="userlogo" onClick={()=>ref.current.click()} className='w-32 h-32 rounded-xl object-cover object-center'/>
                        <div className='w-full h-full flex flex-col gap-1'>
                            <p className='text-2xl font-medium text-white'>Satwik Bhatia</p>
                            <p className='text-gray-500'>{_id}</p>
                        </div>
                    </div>
                </div>
                
                <input type="file" id='photo' ref={ref} onChange={handlePhotoChange} className='hidden'/>
                <p className='uppercase font-medium'>{user.type}</p>
                <h1 className='font-semibold text-lg'>Username: <span className='font-normal'>{username}</span></h1>
                <h1 className='font-semibold text-lg'>Email: <span className='font-normal'>{email}</span></h1>
                <textarea id="description" defaultValue={description} onChange={handleDataChange} className='outline-none resize-none'></textarea>
                <div className='flex gap-2'>
                    <button onClick={updateProfile} className={`bg-red-600 ${loading ? 'opacity-85' : ''} text-lg text-white px-2 py-1 rounded-md`}>{loading ? 'Updating' : 'Update' }</button>
                </div>   
                {error && <p className='text-red-500'>{error}</p>}
            </div>
        </div>
)}

export default Profile