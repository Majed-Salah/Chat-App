import mongoose from 'mongoose'
const messagingSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
    room: Number
})

export default mongoose.model('messagingmessages', messagingSchema)