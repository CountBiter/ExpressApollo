import mongoose from 'mongoose'
import { OrgSchema } from '../models/Organisations.js'
import { DB_URL } from '../config/config.js'

mongoose.connect(DB_URL)

let db = mongoose.connection;
db.on('error', () =>{
    console.log("kernel panic")
})

const Organisations = mongoose.model('Organosations', OrgSchema)

export { Organisations }