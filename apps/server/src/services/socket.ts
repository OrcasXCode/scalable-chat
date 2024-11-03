import { Server } from "socket.io";

class SocketService{
    private _io: Server;
    constructor(){
        console.log('Init Socket Server');
        this._io = new Server({
            cors:{
                allowedHeaders:['*'],
                origin:'*'
            }
        });
    }

    public intiListener(){
        const io = this.io;
        console.log('INIT SOCKET LISTENER.....');
        io.on('connect',socket=>{
            console.log('New Connection',socket.id);
            socket.on('event : message',async({message}:{message : string})=>{
                console.log('New Message Recieved',message);
                // io.emit('event : message',message);
            })
        })
    }
    get io(): Server{
        return this._io;
    }
}

export default SocketService;