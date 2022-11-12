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
    _id: ID!
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
    login: String
    hashed_password: String
    telegram_chat_id: String
  }
  type UserRole {
    _id: ID!
    user_id: ID!
    role_id: ID!
  }
  type TypeCI {
    _id: ID!
    title: String
    icon: String
  }
  type Contact {
    _id: ID!
    user_id: ID!
    type_ci: TypeCI
  }
  type TaskFile {
    _id: ID!
    name: String
    author_id: String
    create_date: String
    file_url: String
  }
  type Tasks {
    _id: ID!
    task_type_id: String
    title: String
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
    _id: ID!
    title: String
    sla: Int
  }
  type TaskType {
    _id: ID!
    title: String
    sla: Int
  }
  type Comments {
    _id: ID!
    comments: String
    task_id: String
    author_id: String
  }
  type KnowledgeBaseFiles {
    _id: ID!
    name: String
    author_id: String
    create_date: String
    file_url: String
  }
  type KnowledgeBase {
    _id: ID!
    title: String
    task_id: String
    author_id: String
    create_date: String
    description: String
    files: [KnowledgeBaseFiles]
  }
  type Query {
    getAllOrganisations: [Organisations]
    getAllUsers: [Users]
    getAllRoles: [Roles]
    getAllContacts: [Contact]
    getContact: Contact
    getAllTasks: [Tasks]
    getAllType: [TaskType]
    getAllState: [TaskState]
    getAllComments: [Comments]
    getAllKnowledgeBase: [KnowledgeBase]
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
    login: String
    hashed_password: String
    telegram_chat_id: String
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
  }
  input inputStateTask {
    title: String
    sla: Int
  }
  input inputTypeTask {
    title: String
    sla: Int
  }
  input inputComments {
    comments: String
    task_id: String
    author_id: String
  }
  input inputKnowledgeBaseFiles {
    name: String
    author_id: String
    create_date: String
    file_url: String
  }
  input inputKnowledgeBase {
    title: String
    task_id: String
    author_id: String
    create_date: String
    description: String
  }
  type Mutation {
    getOrganisation(orgId: String): Organisations
    addOrganisation(org: inputOrganisation): Organisations
    updateOrganisation(
      updateData: inputOrganisation
      orgId: String
    ): Organisations
    deleteOrganisation(id: String): String
    getRole(roleId: String): Roles
    addRoles(roles: inputRoles, rolesTasks: inputRoleTaskPermmission): Roles
    updateRoles(
      roleId: String
      updateData: inputRoles
      updateDataTask: inputRoleTaskPermmission
    ): Roles
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
    updateTask(taskId: String, newTaskData: inputTask): Tasks
    deleteTask(taskId: String): String
    addParamsToTask(taskId: String, paramsData: inputParams): Tasks
    updateParamsToTask(taskId: String, newParamsData: inputParams): Tasks
    addFileToTask(taskId: String, fileData: inputTaskFile): Tasks
    getState(stateId: String): TaskState
    addStateToTask(taskId: String, stateData: inputStateTask): Tasks
    addState(stateData: inputStateTask): TaskState
    updateStateToTask(
      stateId: String
      taskId: String
      newStateData: inputStateTask
    ): Tasks
    getType(typeId: String): TaskType
    addTypeToTask(taskId: String, typeData: inputTypeTask): Tasks
    addType(typeData: inputTypeTask): TaskType
    updateTypeToTask(
      taskId: String
      typeId: String
      newTypeData: inputTypeTask
    ): Tasks
    getComment(commentId: String): Comments
    addCommentsToTask(taskId: String, commentsData: inputComments): Comments
    deleteCommentsToTask(commentsId: String): String
    getKnowledgeBase(knowledgeBaseId: String): KnowledgeBase
    addKnowledgeBase(knowledgeBaseData: inputKnowledgeBase): KnowledgeBase
    deleteKnowledgeBase(knowledgeBaseId: String): String
    addFileToKnowledgeBase(
      knowledgeBaseId: String
      KnowledgeBaseFileData: inputKnowledgeBaseFiles
    ): KnowledgeBase
  }
`;
