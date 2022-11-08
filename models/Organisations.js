import mongoose from 'mongoose'

export const OrgSchema = new mongoose.Schema({
    title:{
        type: String
    },
    full_name:{
        type: String
    },
    icon: {
        type: String,
        default: "http://127.0.0.1/static/default_icon.png"
    },
    idfification_number: {
        type: String
    },
    kpp:{
        type: String
    },
    oked:{
        type: String
    }
})