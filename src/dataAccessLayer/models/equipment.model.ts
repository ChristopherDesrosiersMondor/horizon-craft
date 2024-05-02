import mongoose from 'mongoose'

export const equimentModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    marketPrice: {
        type: String,
        required: true
    },
    craftingCreditCost: {
        type: String,
        required: true
    },
    craftingRessources: {
        type: String,
        required: true
    },
    timeInMinutes: {
        type: String,
        required: true
    },
    timeInDowntime: {
        type: String,
        required: true
    },
    maxPerDowntime: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

export type Equipment = typeof equimentModel