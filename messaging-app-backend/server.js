import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import cors from 'cors'
import Pusher from 'pusher'
import chatRoom from './chatRoom.js'

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 9000
const connection_url = "mongodb+srv://xxxx:xxxx@xxxxx" // change to have personal username and password

const pusher = new Pusher({
    appId: "xxxxx",
    key: "xxxxx",
    secret: "xxxxx",
    cluster: "xxxxx",
    useTLS: true
});

const db = mongoose.connection
db.once("open", () => {
    console.log("DB Connected")
    const msgCollection = db.collection("messagingmessages")
    const changeStream = msgCollection.watch()
    changeStream.on("change", change => {
        console.log(change)
        if(change.operationType === "insert"){
            const messageDetails = change.fullDocument
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
                room: messageDetails.room
            })
        }
        else{
            console.log("Error triggering push")
        }
    })

    const roomCollection = db.collection("chatrooms")
    const changeRoom = roomCollection.watch()
    changeRoom.on("change", change => {
        console.log(change)
        if(change.operationType === "insert"){
            const chatDetails = change.fullDocument
            pusher.trigger("rooms", "inserted", {
                roomId: chatDetails.roomId,
                roomName: chatDetails.roomName
            })
        }
        else{
            console.log("Error triggering push")
        }
    })

})

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get("/", (req, res) => res.status(200).send("Testing"))

app.post("/messages/new", (req,res) => {
    const dbMessage = req.body
    Messages.create(dbMessage)
        .then((result) => res.status(201).send(result))
        .catch((err) => res.status(500).send(err))
})

app.get("/messages/sync", (req,res) => {
    Messages.find()
        .then((result) => res.status(201).send(result))
        .catch((err) => res.status(500).send(err))
})

app.post("/room/add", (req, res) => {
    const room = req.body
    chatRoom.create(room)
        .then((result) => res.status(201).send(result))
        .catch((err) => res.status(500).send(err))
})

app.get("/room/get", (req,res) => {
    chatRoom.find()
        .then((result) => res.status(201).send(result))
        .catch((err) => res.status(500).send(err))
})

app.listen(port, () => console.log(`Listening on port: ${port}`))
