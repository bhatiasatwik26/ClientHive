import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../utils/userSlice";
import { setSelectedChat } from "../../utils/chatSlice";
import { TbPhotoUp } from "react-icons/tb";
import { PiPencilSimpleBold } from "react-icons/pi";
import { TiInfoLarge } from "react-icons/ti";
import { MdEmail } from "react-icons/md";

const Profile = () => {
  const user = useSelector((state) => state.CurrUser.user);
  const { photo, _id, type, username, email, description, createdAt } = user;
  const readableDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const ref = useRef(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const dispatch = useDispatch();
  dispatch(setSelectedChat(null));

  const handleDataChange = (e) => {
    setUpdateData({ ...updateData, [e.target.id]: e.target.value });
  };

  const updateProfile = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch(`${import.meta.env.VITE_API_PATH}/api/user/update/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updateData),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success === false) setError(data.message);
    dispatch(updateUser(data.data));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUpdateData({ ...updateData, photo: reader.result });
      };
    } catch (err) {
      setError("Error in selecting photo");
      console.log(err);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-start bg-[#222a3f] p-6 rounded-xl">
      <div className="w-full h-full rounded-2xl overflow-hidden">
        <div className="w-full h-[25vh] relative mb-16 rounded-xl">
          <img src="https://images.unsplash.com/photo-1493166228553-4fa0fdb916e8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="logo" className="h-full w-full object-cover object-center"/>
          <div className="absolute w-full bottom-0 left-0 translate-y-[47%] flex items-end gap-4 p-4">
            <div className="relative group cursor-pointer">
              <img
                src={photo}
                alt="userlogo"
                onClick={() => ref.current.click()}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#222a3f]"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-4xl text-white bg-black bg-opacity-85 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <TbPhotoUp className="text-[#dd1d5d] hover:scale-105 duration-100" />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-white">
              <p className="text-3xl font-semibold capitalize">
                {username} 
                <span className="text-[#ffffff50] text-base ml-2">({type})</span>
              </p>
              <p className="text-[#ffffff15] text-sm">{_id}</p>
            </div>
          </div>
        </div>

        <div className="w-full space-y-6 mt-4">
          <input
            type="file"
            id="photo"
            ref={ref}
            onChange={handlePhotoChange}
            className="hidden"
          />

          <div className="bg-[#1d2437] p-6 rounded-b-2xl w-full flex flex-col justify-start gap-6">
            <div className="w-full flex items-center justify-between px-4 border-b-2 pb-3 border-b-[#222a3f]">
              <p className="text-xl text-[#dd1d5d]">Email :</p>
              <p className="text-white">{email}</p>
            </div>
            <div className="w-full flex items-center justify-between px-4 border-b-2 pb-3 border-b-[#222a3f]">
              <p className="text-xl text-[#dd1d5d]">User since :</p>
              <p className="text-white">{readableDate}</p>
            </div>
            <div className="px-3">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[#dd1d5d] text-xl">About me :</span>
              </div>
              <textarea
                id="description"
                defaultValue={description}
                onChange={handleDataChange}
                spellCheck="false"
                className="w-full p-3 bg-[#222a3f] text-white rounded-md resize-none border-2 border-[#fff0] focus:border-opacity-20 outline-none min-h-[120px]"
                placeholder="Add description here..."
              ></textarea>
            </div>
            <button
              onClick={updateProfile}
              disabled={loading}
              className={` bg-[#dd1d5d] text-white py-2 px-3 rounded-md disabled:opacity-70 disabled:cursor-not-allowed hover:bg-[#dd1d5daf] duration-200 ease-in-out self-center text-lg`}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
  
          {error && (
            <p className="text-[#dd1d5d] mt-4 text-center bg-[#dd1d5d10] p-3 rounded-md">
              {error}
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;