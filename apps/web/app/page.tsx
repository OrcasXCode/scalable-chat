'use client'
import { useSocket } from '../context/SocketProvider';
import { useState } from 'react';


export default function Page() {

  const {sendMessage} = useSocket();
  const [message,setMessage] = useState('');

  return(
    <>
    <div className="bg-black h-screen w-screen text-white">
      <h1 className="text-2xl">Scalable Chat App</h1>
      <div className="text-2xl">
        <div>
          <h1>All message will appear here</h1>
        </div>
        <div>
          <input className="rounded-full" placeholder="Message....."
          onChange={e=>setMessage(e.target.value)}/>
          <button onClick={(e)=>sendMessage(message)}
           className="bg-green-700 pr-5 pl-5 rounded-full">Send</button>
        </div>
      </div>
    </div>
    </>
  )
}