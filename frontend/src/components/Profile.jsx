import  { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../utils/userSlice';
import { setSelectedChat } from '../../utils/chatSlice';

const Profile = () => {
    const user = useSelector(state=>state.CurrUser.user);
    const {photo, _id, type, username, email, description} = user;
    const ref = useRef(null);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const dispatch = useDispatch();
    dispatch(setSelectedChat(null));

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
        <div className="h-full flex-1 flex flex-col items-center justify-start bg-[#222a3f] p-4 rounded-xl">
          <div className="w-[100%] h-[100%] rounded-3xl overflow-hidden">
          <div className="w-full h-[30vh] p-4 relative mb-20">
            <img
                src="https://images.unsplash.com/photo-1707175834429-dcfdf423e2ae?q=80&w=2320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="h-full w-full rounded-3xl object-cover object-top"
            />
            <div
                className="absolute w-full h-fit bottom-0 translate-y-[35%]
                translate-x-[3%] left-0 flex p-1 pl-4 items-end gap-2"
            >
                <div className="relative group hover:cursor-pointer">
                <img
                    src={photo}
                    alt="userlogo"
                    onClick={() => ref.current.click()}
                    className="w-32 h-32 rounded-xl object-cover object-center"
                />
                <p
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center
                    bg-black bg-opacity-60 text-white text-sm font-medium opacity-0 transition-opacity duration-300
                    rounded-xl group-hover:opacity-100 pointer-events-none hover:cursor-pointer"
                >
                    Change Image By Clicking
                </p>
                </div>
                <div className="w-full h-full flex flex-col gap-1">
                <p className="text-2xl font-medium text-black ">Satwik Bhatia</p>
                <p className="text-gray-500">{_id}</p>
                </div>
            </div>
            </div>

            <div className="w-full px-5 py-2">
              <input
                type="file"
                id="photo"
                ref={ref}
                onChange={handlePhotoChange}
                className="hidden"
              />
              <div className="mb-4">
                <h1 className="font-semibold text-lg mb-1 flex gap-20 bg-gray-100 p-2 rounded-md transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:border-b-4 hover:border-gray-400">
                  <span>Username</span>
                  <span className="font-normal tracking-normal">{username}</span>
                </h1>
              </div>
              <div className="mb-4">
                <h1 className="font-semibold text-lg mb-1 flex gap-28 bg-gray-100 p-2 rounded-md transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:border-b-4 hover:border-gray-400">
                  <span>Email</span>
                  <span className="font-normal tracking-normal">{email}</span>
                </h1>
              </div>
              <div className="mb-4">
                <h1 className="font-semibold text-lg mb-1 flex gap-28 bg-gray-100 p-2 rounded-md transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:border-b-4 hover:border-gray-400">
                  <span>Type</span>
                  <span className="font-normal tracking-normal">{user.type}</span>
                </h1>
              </div>
              <div className="mb-4">
                <textarea
                  id="description"
                  defaultValue={description}
                  onChange={handleDataChange}
                  className="outline-none resize-none w-full px-2 py-1 border border-gray-300 rounded-md"
                  placeholder="Add description here..."
                ></textarea>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={updateProfile}
                  className={`bg-red-600 ${
                    loading ? "opacity-85" : ""
                  } text-lg text-white px-6 py-2 rounded-md`}
                >
                  {loading ? "Updating" : "Update"}
                </button>
              </div>
              {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            </div>
          </div>
        </div>
      );
      }

export default Profile