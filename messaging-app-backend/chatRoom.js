import mongoose from 'mongoose'
const chatRoom = mongoose.Schema({
    roomId: Number,
    roomName: String
})

export default mongoose.model('chatRooms', chatRoom)