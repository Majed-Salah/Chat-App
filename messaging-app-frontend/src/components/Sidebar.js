import React from 'react'
import './Sidebar.css'

import {SearchOutlined} from '@material-ui/icons'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {Avatar, IconButton} from '@material-ui/core'
import SidebarChat from './SidebarChat'
import {useStateValue} from "./StateProvider"


const Sidebar = ({setActiveRoom, rooms, messages}) => {

    const [{user}, dispatch] = useStateValue()

    function SetActiveRoom(roomId) {
        console.log(roomId)
        setActiveRoom(roomId)
    }

    return(
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL} />
                <div className='sidebar_header-Right'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined />
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>
            <div className='sidebar_chats'>
                {rooms.map(room => <SidebarChat setActiveRoom={setActiveRoom} room={room} messages={messages} onClick={() => console.log("clicked")} />)}
            </div>
        </div>
    )
}

export default Sidebar