import mongoose from 'mongoose'
import { OrgSchema } from '../models/Organisations.js'
import { RolesSchema } from '../models/Roles.js'
import { UsersSchema } from '../models/Users.js'
import { UserRolesSchema } from '../models/User_Roles.js'
import { ContactsSchema } from '../models/Contacts.js'
import { TaskCommentsSchema, TaskStateSchema, TaskTypeSchema, TasksSchema } from '../models/Tasks.js'
import { KnowledgeBaseSchema } from '../models/Knowledge_base.js'
import { DB_URL } from '../config/config.js'

mongoose.connect(DB_URL)

let db = mongoose.connection;
db.on('error', () =>{
    console.log("kernel panic")
})

const Organisations = mongoose.model('organosations', OrgSchema)
const Roles = mongoose.model('roles', RolesSchema)
const User = mongoose.model('users', UsersSchema)
const UserRoles = mongoose.model('user_roles', UserRolesSchema)
const Contacts = mongoose.model("contacts", ContactsSchema)
const TaskComments = mongoose.model("task_comments", TaskCommentsSchema)
const TaskState = mongoose.model("task_state", TaskStateSchema)
const TaskType = mongoose.model("task_types", TaskTypeSchema)
const Tasks = mongoose.model("tasks", TasksSchema)
const KnowledgeBase = mongoose.model("knowledge_base", KnowledgeBaseSchema)
export { Organisations, Roles, User, UserRoles, Contacts, TaskComments, TaskState, TaskType, Tasks, KnowledgeBase}