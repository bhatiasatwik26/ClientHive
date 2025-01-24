import  { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
const SignUp = () => {
    const [signup, setsignup] = useState(false)
    const [form, setForm] = useState({})
    const[error, setError] = useState('')
    const[loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeMode = ()=>{setsignup(!signup)}

    const handleForm = (e)=>{
        setForm({...form, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        const mode = signup ? 'signin' : 'signup';
        const res = await fetch(import.meta.env.VITE_API_PATH+'/api/auth/'+mode, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        const data = await res.json();
        setLoading(false);
        if(data.sucess===false){
            setError(data.message)
        }
        else{
            dispatch(signInSuccess(data.user))
            navigate('/dashboard')
        }
    }

    return (
        <div className={`w-full h-full flex relative bg-[#222a3f]`}>
            <form onSubmit={handleSubmit} className={`w-[70%] h-full relative flex flex-col items-center justify-center p-3  gap-3 duration-1000 ease-in-out ${signup ? 'translate-x-[40%]' : ''}`}>
                <img src={logo} alt='logo.png' className='w-20 h-20 scale-[150%] object-cover'/>
                <h1 className='text-[white] text-5xl font-semibold mb-10'>
                    {!signup ? 'Hey! lets get you started.' : 'Its good to have you back!'}
                </h1>
                {!signup && <input type="text" placeholder='Enter your name' id='username'
                onChange={handleForm} className='text-lg px-4 py-3 outline-none bg-[#1d2437] rounded-ss-xl rounded-ee-xl w-[30%] text-[white] tracking-wider'/>}
                <input type="text" placeholder='Whats your email' id='email'
                onChange={handleForm} className='text-lg px-4 py-3 outline-none bg-[#1d2437] rounded-ss-xl rounded-ee-xl w-[30%] text-[white] tracking-wider'/>
                <input type="password" placeholder='Enter Password' id='password'
                onChange={handleForm} className='text-lg px-4 py-3 outline-none bg-[#1d2437] rounded-ss-xl rounded-ee-xl w-[30%] text-[white] tracking-wider'/>
                <p className='text-red-500 font-medium'>{error}</p>
                <button className='bg-[#dd1d5d] hover:bg-[#dd1d5daf] duration-150 ease-in-out text-white px-1 py-2 text-lg rounded-full w-[22%] mt-10'>{loading?'Loading...':'Sign Up'}</button>
            </form>
            <div className={`top-0 w-[30%]  h-full bg-[#1d2437] flex flex-col p-2 items-center justify-center text-white gap-2 transition-all duration-[850ms] ease-in-out ${signup ? '-translate-x-[234%] rounded-e-[5%]' : 'rounded-s-[5%]'} text-center`}>
               <p className=' text-4xl font-semibold tracking-wide text-[#f32469]'>
                {!signup ? 'Already a user ?' : 'Wanna join us ?'}</p>
               <p onClick={changeMode} className='hover:underline cursor-pointer font-light text-[#fffffff4]'>
                {!signup ? 'Sign-in instead' : 'Sign-up instead'}
               </p>
            </div>
        </div>
    )}

export default SignUp