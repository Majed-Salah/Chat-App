import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat'
import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import axios from "./components/axios"
import Login from './components/Login';

import {useStateValue} from './components/StateProvider'

function App() {

  const [messages, setMessages] = useState([])
  const [rooms, setRooms] = useState([])
  const [activeRoom, setActiveRoom] = useState(1)
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {
    axios.get("http://localhost:9000/messages/sync").then(res => {
      setMessages(res.data)
    })

    axios.get("http://localhost:9000/room/get").then(res => {
      setRooms(res.data)
    })

  }, [])

  useEffect(() => {

    var pusher = new Pusher('xxxxx', {
      cluster: 'xxxx'
    });

    var channel = pusher.subscribe('messages');
    var roomChannel = pusher.subscribe("rooms")

    channel.bind('inserted', function (data) {
      setMessages([...messages, data])
    });

    roomChannel.bind('inserted', function (data){
      setRooms([...rooms, data])
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }

  }, [messages])

  console.log(messages)

  return (
    <div className="app">
      {!user ? <Login /> : <div className="app_body">
        <Sidebar setActiveRoom={setActiveRoom} rooms={rooms} messages={messages} />
        <Chat activeRoom={activeRoom} rooms={rooms} messages={messages} />
      </div>}
    </div>
  );
}

export default App;
