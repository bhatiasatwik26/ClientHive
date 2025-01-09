import React, { useEffect } from 'react'
import { setPersonalChats } from '../../utils/chatSlice'
import { useDispatch } from 'react-redux'

const getPersonalChats = () => {

  useEffect(() => {
    fetchPersonalChats()
  }, [])
  const dispatch = useDispatch();

  const fetchPersonalChats = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_PATH}/api/chat/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application'
      },
      credentials: 'include'
    });
    const data = await res.json();
    dispatch(setPersonalChats(data.data));
  }
}

export default getPersonalChats