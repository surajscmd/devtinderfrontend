import io from 'socket.io-client';
import { Base_Url } from './constant';

export const createSocketConnection = () =>{
    if(location.hostname === "localhost"){
        return io(Base_Url);
    }else{
        return io("/", {path:"/api/socket.io"});
    }

}