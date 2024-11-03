'use client'

import React, { createContext, useContext,useEffect, ReactNode, useCallback, useState } from 'react'
import {io , Socket} from 'socket.io-client';

interface SocketProviderProps {
    children?: ReactNode;
}

interface ISocketContext {
    sendMessage:(msg:string)=>any;
}
const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state=useContext(SocketContext);
    if(!state){
        throw new Error('SocketProvider not found');
    }
    return state;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [socket,setSocket]=useState<Socket | null>(null);

    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        console.log('Send Message',msg);
        if(socket){
            socket.emit('event : message',{message : msg});
        }
    },[]);

    useEffect(()=>{
        const _socket=io("http://localhost:8000");
        setSocket(_socket);
        return ()=>{
            _socket.disconnect();
            setSocket(null);
        }
    },[]);


    return (
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    );
}
