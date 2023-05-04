import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'

const SidebarChat = ({setActiveRoom, room, messages}) => {
    const [seed, setSeed] = useState("")
    const [roomMessages, setRoomMessages] = useState([])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000)) 
    }, [])

    const SetActiveRoom = (roomId) => {
        console.log(roomId)
        setActiveRoom(roomId)
    }
    
    useEffect(() => {

        const filteredMessages = messages.filter(message => message.room === room.roomId)
        setRoomMessages(filteredMessages)

    }, [messages])

    return ( 
        <div className="sidebarChat" onClick={() => SetActiveRoom(room.roomId)}>
            <Avatar src={`https://avatars.dicebear.com/api/human/b${seed}.svg`} /> 
            <div className="sidebarChat__info">
                <h2>{room.roomName}</h2> 
                <p>{roomMessages[roomMessages.length - 1]?.message}</p> 
            </div> 
        </div> ) 
    }

export default SidebarChat