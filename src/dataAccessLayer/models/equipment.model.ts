import mongoose from 'mongoose'

export const equimentModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

export type Equipment = typeof equimentModel