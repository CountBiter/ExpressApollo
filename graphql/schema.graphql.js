import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Organisations {
    _id: ID!
    title: String
    full_name: String
    icon: String
    idfification_number: String
    kpp: String
    oked: String
  }
  type RoleTaskPermmission {
    title: Boolean
    description: Boolean
    implementer: Boolean
    state: Boolean
    priority: Boolean
    files: Boolean
    comments: Boolean
    admin: Boolean
  }
  type Roles {
    _id: ID!
    title: String
    icon: String
    description: String
    permmission: RoleTaskPermmission
  }
  type Users {
    _id: ID!
    first_name: String
    last_name: String
    middle_name: String
    full_name: String
    post: String
    depaptament: String
    organisation_id: ID
  }
  type UserRole {
    user_id: ID!
    role_id: ID!
  }
  type TypeCI {
    title: String
    icon: String
  }
  type Contact {
    _id: ID!
    user_id: ID!
    type_ci: TypeCI
  }
  type TaskFile {
    name: String
    author_id: String
    create_date: String
    file_url: String
  }
  type Tasks {
    task_type_id: String
    title: String,
    description: String
    create_date: String
    acceptence_date: String
    finished_date: String
    author_id: String
    implementer_id: String
    state_id: String
    priority: String
    mata_tags: [String]
    files: [TaskFile]
  }
  type TaskState {
    title: String
    sla: Int
  }
  type TaskType {
    title: String,
    sla: Int,
  }
  type Query {
    getAllOrganisations: [Organisations]
    getAllUsers: [Users]
    getAllRoles: [Roles]
    getAllContacts: [Contact]
    getAllTasks: [Tasks]
  }
  input inputOrganisation {
    title: String
    full_name: String
    icon: String
    idfification_number: String
    kpp: String
    oked: String
  }
  input inputDeleteOrganisation {
    organisation_id: ID!
  }
  input inputRoles {
    title: String
    icon: String
    description: String
  }
  input inputRoleTaskPermmission {
    title: Boolean
    description: Boolean
    implementer: Boolean
    state: Boolean
    priority: Boolean
    files: Boolean
    comments: Boolean
    admin: Boolean
  }
  input inputUsers {
    first_name: String
    last_name: String
    middle_name: String
    full_name: String
    post: String
    depaptament: String
    organisation_id: ID!
  }
  input inputUpdateRole {
    title: Boolean
    description: Boolean
    implementer: Boolean
    state: Boolean
    priority: Boolean
    files: Boolean
    comments: Boolean
    admin: Boolean
  }
  input inputTypeCI {
    title: String
    icon: String
  }
  input inputContacts {
    user_id: ID!
  }
  input inputTask {
    title: String
    description: String
    create_date: String
    author_id: String
  }
  input inputTaskFile {
    name: String
    author_id: String
    create_date: String
    file_url: String
  }
  input inputParams {
    task_type_id: String
    acceptence_date: String
    finished_date: String
    implementer_id: String
    state_id: String
    priority: String
    mata_tags: [String]
    files: [inputTaskFile]
  }
  input inputStateTask {
    title: String
    sla: Int
  }
  input inputTypeTask { 
    title: String,
    sla: Int,
  }
  type Mutation {
    getOrganisation(orgId: String): Organisations
    addOrganisation(org: inputOrganisation): Organisations
    updateOrganisation(updateData: inputOrganisation, orgId: String): Organisations
    deleteOrganisation(id: String): String
    getRole(roleId: String): Roles
    addRoles(roles: inputRoles, rolesTasks: inputRoleTaskPermmission): Roles
    updateRoles(roleId: String, updateData: inputRoles, updateDataTask: inputRoleTaskPermmission): Roles
    deleteRoles(roleId: String): String
    getUser(userId: String): Users 
    addUsers(user: inputUsers): Users
    updateUser(userId: String, updateData: inputUsers): Users
    deleteUser(userId: String): String
    getUserRole(userRoleId: String): UserRole  
    addUserRoles(roleId: String, userId: String): UserRole
    updateUserRoles(updateData: inputUpdateRole, oldIdRole: String): Roles
    getUserContact(userId: String): [Contact]
    addContacts(newContact: inputContacts, typeCI: inputTypeCI): Contact
    updateContacts(contactId: String, updateTypeCI: inputTypeCI): Contact
    deleteContasts(contactId: String): String
    getTask(taskId: String): Tasks
    addTask(taskData: inputTask): Tasks
    updateTask(taskId: String, newTaskData) Task
    deleteTask(taskId: String): String
    addParamsToTask(taskId: String, paramsData: inputParams, taskFile: inputTaskFile): Tasks
    addStateToTask(stateData: inputStateTask): TaskState
    addTypeToTask(typeData: inputTypeTask)
  }
`;