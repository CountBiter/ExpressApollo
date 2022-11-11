import { Schema } from "mongoose";

const RoleTaskPermmissionSchema = new Schema({
    title: {
        type: Boolean,
        default: false
    },
    description: {
        type: Boolean,
        default: false
    },
    implementer: {
        type: Boolean,
        default: false
    },
    state: {
        type: Boolean,
        default: false
    },
    priority: {
        type: Boolean,
        default: false
    },
    files: {
        type: Boolean,
        default: false
    },
    comments: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }

})

export const RolesSchema = new Schema({
    title: String,
    icon: String,
    description: String,
    permmission: RoleTaskPermmissionSchema
})