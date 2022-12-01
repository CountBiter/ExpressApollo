import dotenv from "dotenv";
dotenv.config();

import {
  Organisations,
  Roles,
  User,
  UserRoles,
  Contacts,
  TaskComments,
  TaskState,
  TaskType,
  Tasks,
  KnowledgeBase,
} from "../database/dbConnector.js";
import { ObjectId } from "mongodb";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {
    getAllOrganisations: async () => {
      try {
        return await Organisations.find();
      } catch (err) {
        return new Error(err);
      }
    },
    getUser: async (_, { userId }) => {
      try {
        console.log(userId);
        for (let i = 0; i < userId.length; i++) {
          return await User.findOne({ _id: ObjectId(userId[i]) });
        }
      } catch (err) {
        return new Error(err);
      }
    },
    getAllUsers: async () => {
      try {
        return await User.find();
      } catch (err) {
        return new Error(err);
      }
    },
    getUserRole: async (_, { token }) => {
      try {
        console.log(token);
        const { user_id } = jwt.decode(token, process.env.JWT_SECRET);
        return await UserRoles.findOne({ user_id: user_id });
      } catch (err) {
        return new Error(err);
      }
    },
    getRole: async (_, { token }) => {
      try {
        const { role_id } = jwt.decode(token, process.env.JWT_SECRET);
        const findRole = await Roles.findOne({ _id: ObjectId(role_id) });
        return findRole;
      } catch (err) {
        return new Error(err);
      }
    },
    getAllRoles: async () => {
      try {
        return await Roles.find();
      } catch (err) {
        return new Error(err);
      }
    },
    getAllContacts: async () => {
      try {
        return await Contacts.find();
      } catch (err) {
        return new Error(err);
      }
    },
    getTask: async (_, { taskId }) => {
      try {
        return await Tasks.findOne({ _id: ObjectId(taskId) });
      } catch (err) {
        return new Error(err);
      }
    },
    getAllUserTasks: async (_, { token }) => {
      try {
        const { user_id } = jwt.decode(token, process.env.JWT_SECRET);
        const allUserTasks = Tasks.find({ author_id: user_id });
        return allUserTasks;
      } catch (err) {
        return new Error(err);
      }
    },
    getAllUserImplementerTasks: async (_, { token }) => {
      try {
        const { user_id } = jwt.decode(token, process.env.JWT_SECRET);
        const allUserImplementerTasks = Tasks.find({ implementer_id: user_id });

        return allUserImplementerTasks;
      } catch (err) {
        return new Error(err);
      }
    },
    getAllTasks: async (_, { page }) => {
      try {
        let perPage = 20;
        const allTasks = await Tasks.find();
        if (allTasks.length + 1 / page >= perPage) {
          return await Tasks.find()
            .limit(perPage)
            .skip(page === 0 ? 0 : page * perPage);
        } else {
          return "Not tasks";
        }
      } catch (err) {
        return new Error(err);
      }
    },
    getType: async (_, { typeTitle }) => {
      try {
        return await TaskType.findOne({ title: typeTitle });
      } catch (err) {
        return new Error(err);
      }
    },
    getAllType: async () => {
      try {
        return await TaskType.find();
      } catch (err) {
        return new Error(err);
      }
    },
    getState: async (_, { stateId }) => {
      try {
        return await TaskState.findOne({ _id: ObjectId(stateId) });
      } catch (err) {
        return new Error(err);
      }
    },
    getAllTasksWithStatus: async (_, {statusId}) => {
      try {
        const tasks = await Tasks.find({status_id: statusId})
        return tasks
      } catch (err) {
        return new Error(err)
      }
    },
    getAllState: async () => {
      try {
        return await TaskState.find();
      } catch (err) {
        return new Error(err);
      }
    },
    getAllComments: async (_, { taskId }) => {
      try {
        return await TaskComments.find({ task_id: ObjectId(taskId) });
      } catch (err) {
        return new Error(err);
      }
    },
    getAllKnowledgeBase: async (_, { page }) => {
      try {
        let perPage = 20;
        const allBase = KnowledgeBase.find();
        if (allBase.length + 1 / page >= perPage) {
          return await KnowledgeBase.find()
            .limit(perPage)
            .skip(page === 0 ? 0 : page * perPage);
        } else {
          return "Not knowLedge";
        }
      } catch (err) {
        return new Error(err);
      }
    },
  },
  Mutation: {
    getOrganisation: async (_, { orgId }) => {
      try {
        return await Organisations.findOne({ _id: ObjectId(orgId) });
      } catch (err) {
        return new Error(err);
      }
    },
    addOrganisation: async (_, { org }) => {
      try {
        const newUser = new Organisations(org);
        await newUser.save();

        return newUser;
      } catch (err) {
        return new Error(err);
      }
    },
    updateOrganisation: async (_, { updateData, orgId }) => {
      try {
        await Organisations.findOneAndUpdate(
          { _id: ObjectId(orgId) },
          updateData
        );

        const newOrg = await Organisations.findOne({ _id: ObjectId(orgId) });

        return newOrg;
      } catch (err) {
        return new Error(err);
      }
    },
    deleteOrganisation: async (_, { id }) => {
      try {
        await Organisations.deleteOne({ _id: ObjectId(id) });

        await User.deleteMany({ organisation_id: ObjectId(id) });

        return "Organisation deleted";
      } catch (err) {
        return new Error(err);
      }
    },
    addRoles: async (_, { roles, rolesTasks }) => {
      try {
        console.log(rolesTasks)
        let newRoles = roles;
        newRoles.permmission = rolesTasks;
        for (let key in newRoles.permmission) {
          if (newRoles.permmission[key] === null) {
            newRoles.permmission[key] = false;
          }
        }
        const saveRoles = new Roles(newRoles);
        await saveRoles.save();
        console.log(saveRoles);
        return saveRoles;
      } catch (err) {
        return new Error(err);
      }
    },
    updateRoles: async (_, { roleId, updateData, updateDataTask }) => {
      try {
        let NewRole = updateData;
        NewRole.permmission = updateDataTask;
        for (let key in NewRole.permmission) {
          if (NewRole.permmission[key] === null) {
            NewRole.permmission[key] = false;
          }
        }
        await Roles.findOneAndUpdate({ _id: ObjectId(roleId) }, NewRole);

        const updateRoles = await Roles.findOne({ _id: ObjectId(roleId) });

        return updateRoles;
      } catch (err) {
        return new Error(err);
      }
    },
    deleteRoles: async (_, { roleId }) => {
      try {
        await Roles.deleteOne({ _id: ObjectId(roleId) });

        return "Role deleted";
      } catch (err) {
        return new Error(err);
      }
    },
    addUsers: async (_, { user }) => {
      try {
        let salt = 10;
        let hashPassword = hashSync(user.hashed_password.toString(), salt);
        let HashUser = user;
        HashUser.hashed_password = hashPassword;
        const newUser = new User(HashUser);

        await newUser.save();

        return newUser;
      } catch (err) {
        return new Error(err);
      }
    },
    updateUser: async (_, { token, updateData }) => {
      try {
        console.log(token, updateData)
        const {user_id} = jwt.decode(token, process.env.JWT_SECRET)
        let salt = 10;
        let hashPassword = hashSync(updateData.hashed_password.toString(), salt);
        let HashUser = updateData;
        HashUser.hashed_password = hashPassword;
        await User.findOneAndUpdate({ _id: ObjectId(user_id) }, updateData);

        const updateUser = await User.findOne({ _id: ObjectId(user_id) });

        return updateUser;
      } catch (err) {
        return new Error(err);
      }
    },
    deleteUser: async (_, { userId }) => {
      try {
        await User.deleteOne({ _id: ObjectId(userId) });

        return "User deleted";
      } catch (err) {
        return new Error(err);
      }
    },
    addUserRoles: async (_, { roleId, userId }) => {
      try {
        console.log(roleId, userId);
        let userRole = { user_id: userId, role_id: roleId };
        const newUserRole = new UserRoles(userRole);

        await newUserRole.save();

        return newUserRole;
      } catch (err) {
        return new Error(err);
      }
    },
    updateUserRoles: async (_, { updateData, oldIdRole }) => {
      try {
        let NewRoles = updateData;
        for (let key in NewRoles) {
          if (NewRoles[key] === null) {
            NewRoles[key] = false;
          }
        }
        await Roles.findOneAndUpdate(
          { _id: ObjectId(oldIdRole) },
          { $set: { permmission: NewRoles } }
        );
        const updateUserRole = await Roles.findOne({
          _id: ObjectId(oldIdRole),
        });
        return updateUserRole;
      } catch (err) {
        return new Error(err);
      }
    },
    getUserContact: async (_, { userId }) => {
      try {
        const userContact = await Contacts.find({ user_id: ObjectId(userId) });
        console.log(userContact);
        return userContact;
      } catch (err) {
        return new Error(err);
      }
    },
    addContacts: async (_, { contact, typeCI }) => {
      try {
        const {user_id} = jwt.decode(contact.user_id, process.env.JWT_SECRET);
        let userContact = {user_id: ObjectId(user_id), value: contact.value, type_ci: typeCI}

        const newContacts = new Contacts(userContact);
        newContacts.save();

        return newContacts;
      } catch (err) {
        return new Error(err);
      }
    },
    updateContacts: async (_, { contactId, updateTypeCI }) => {
      try {
        await Contacts.findOneAndUpdate(
          { _id: ObjectId(contactId) },
          { $set: { type_ci: updateTypeCI } }
        );

        const updateContacts = await Contacts.findOne({
          _id: ObjectId(contactId),
        });

        return updateContacts;
      } catch (err) {
        return new Error(err);
      }
    },
    deleteContasts: async (_, { contactId }) => {
      try {
        await Contacts.deleteOne({ _id: ObjectId(contactId) });

        return "Contact deleted";
      } catch (err) {
        return new Error(err);
      }
    },
    addTask: async (_, { taskData, token }) => {
      try {
        const { user_id, role_id } = jwt.decode(token, process.env.JWT_SECRET);
        const userRole = await Roles.findOne({ _id: ObjectId(role_id) });
        if (
          userRole.permmission.files ||
          userRole.permmission.description ||
          userRole.permmission.title ||
          userRole.permmission.priority ||
          (userRole.permmission.implementer &&
            userRole.permmission.state &&
            userRole.permmission.priority)
        ) {
          const padTo2Digits = (num) => {
            return num.toString().padStart(2, "0");
          };
          let task = taskData;
          const date = new Date(Number(task.create_date));

          task.create_date =
            `${[
              padTo2Digits(date.getHours()),
              padTo2Digits(date.getMinutes()),
            ].join(":")} ` +
            `${[
              padTo2Digits(date.getDate()),
              padTo2Digits(date.getMonth() + 1),
              date.getFullYear(),
            ].join("/")}`;
          task.author_id = user_id;
          const newTask = new Tasks(task);
          newTask.save();

          return newTask;
        } else throw "This user can't";
      } catch (err) {
        return new Error(err);
      }
    },
    addParamsToTask: async (_, { taskId, params }) => {
      try {
        const {
          task_type_id,
          acceptence_date,
          finished_date,
          implementer_id,
          state_id,
          priority,
          mata_tags,
        } = params;
        await Tasks.updateOne(
          {
            _id: ObjectId(taskId),
          },
          {
            $set: {
              task_type_id: task_type_id,
              acceptence_date: acceptence_date,
              finished_date: finished_date,
              implementer_id: implementer_id,
              state_id: state_id,
              priority: priority,
              mata_tags: mata_tags,
            },
          }
        );
        const task = await Tasks.findOne({ _id: ObjectId(taskId) });

        return task;
      } catch (err) {
        return new Error(err);
      }
    },
    updateTask: async (_, { taskId, newTaskData }) => {
      try {
        await Tasks.findOneAndUpdate({ _id: ObjectId(taskId) }, newTaskData);
        const newTask = await Tasks.findOne({ _id: ObjectId(taskId) });
        return newTask;
      } catch (err) {
        return new Error(err);
      }
    },
    deleteTask: async (_, { taskId }) => {
      try {
        await Tasks.deleteOne({ _id: ObjectId(taskId) });

        return "Task deleted";
      } catch (err) {
        return new Error(err);
      }
    },
    addFileToTask: async (_, { taskId, fileData, token }) => {
      try {
        const { user_id } = jwt.decode(token, process.env.JWT_SECRET);
        const taskFile = await Tasks.findOne({ _id: ObjectId(taskId) });
        let authorFile = fileData;
        authorFile.author_id = user_id;
        let file = [];

        taskFile.files.forEach((item) => {
          file.push(item);
        });

        file.push(authorFile);

        await Tasks.findOneAndUpdate(
          { _id: taskId },
          { $set: { files: file } }
        );
        const task = await Tasks.findOne({ _id: ObjectId(taskId) });
        console.log(task);
        return task;
      } catch (err) {
        return new Error(err);
      }
    },
    addStateToTask: async (_, { taskId, stateData }) => {
      try {
        console.log(taskId, stateData);
        const state = new TaskState(stateData);
        await state.save();
        console.log(state._id);
        await Tasks.findOneAndUpdate(
          { _id: ObjectId(taskId) },
          { $set: { state_id: state._id } }
        );
        const task = await Tasks.findOne({ _id: taskId });
        return task;
      } catch (err) {
        return new Error(err);
      }
    },
    addState: async (_, { stateData }) => {
      try {
        const state = new TaskState(stateData);
        await state.save();

        return state;
      } catch (err) {
        return new Error(err);
      }
    },
    updateStateToTask: async (_, { stateId, taskId, newStateData }) => {
      try {
        const stateTask = await TaskState.findOneAndUpdate(
          { _id: ObjectId(stateId) },
          newStateData
        );
        console.log(stateTask._id);
        await Tasks.findOneAndUpdate(
          { _id: ObjectId(taskId) },
          { $set: { state_id: stateTask._id } }
        );
        const task = await Tasks.findOne({ _id: ObjectId(taskId) });
        console.log(task);
        return task;
      } catch (err) {
        return new Error(err);
      }
    },
    addTypeToTask: async (_, { taskId, typeData }) => {
      try {
        const type = new TaskType(typeData);
        await type.save();

        await Tasks.findOneAndUpdate(
          { _id: ObjectId(taskId) },
          { $set: { task_type_id: type._id } }
        );

        const task = await Tasks.findOne({ _id: ObjectId(taskId) });
        return task;
      } catch (err) {
        return new Error(err);
      }
    },
    addType: async (_, { typeData }) => {
      try {
        const newType = TaskType(typeData);
        await newType.save();

        return newType;
      } catch (err) {
        return new Error(err);
      }
    },
    updateTypeToTask: async (_, { taskId, typeId, newTypeData }) => {
      try {
        const newType = await TaskType.findOneAndUpdate(
          { _id: ObjectId(typeId) },
          newTypeData
        );

        await Tasks.findOneAndUpdate(
          { _id: ObjectId(taskId) },
          { $set: { task_type_id: newType._id } }
        );

        const task = await Tasks.findOne({ _id: ObjectId(taskId) });
        return task;
      } catch (err) {
        return new Error(err);
      }
    },
    getComment: async (_, { commentId }) => {
      try {
        return await TaskComments.findOne({ _id: ObjectId(commentId) });
      } catch (err) {
        return new Error(err);
      }
    },
    addCommentsToTask: async (_, { commentsData, token }) => {
      try {
        const { user_id } = jwt.decode(token, process.env.JWT_SECRET);
        let comment = commentsData;
        comment.author_id = user_id;
        const newComment = new TaskComments(comment);
        await newComment.save();

        return newComment;
      } catch (err) {
        return new Error(err);
      }
    },
    deleteCommentsToTask: async (_, { commentsId }) => {
      try {
        await TaskComments.deleteOne({ _id: ObjectId(commentsId) });

        return "Comments deleted";
      } catch (err) {
        return new Error(err);
      }
    },
    getKnowledgeBase: async (_, { knowledgeBaseId }) => {
      try {
        return await KnowledgeBase.findOne({ _id: ObjectId(knowledgeBaseId) });
      } catch (err) {
        return new Error(err);
      }
    },
    addKnowledgeBase: async (_, { knowledgeBaseData, token }) => {
      try {
        const { user_id } = jwt.decode(token, process.env.JWT_SECRET);
        let knowledge = knowledgeBaseData;
        knowledge.author_id = user_id;
        const base = new KnowledgeBase(knowledge);
        base.save();

        return base;
      } catch (err) {
        return new Error(err);
      }
    },
    deleteKnowledgeBase: async (_, { knowledgeBaseId }) => {
      try {
        await KnowledgeBase.deleteOne({ _id: ObjectId(knowledgeBaseId) });

        return "KnowledgeBase deleted";
      } catch (err) {
        return new Error(err);
      }
    },
    addFileToKnowledgeBase: async (
      _,
      { knowledgeBaseId, KnowledgeBaseFileData, token }
    ) => {
      try {
        const { user_id } = jwt.decode(token, process.env.JWT_SECRET);
        const baseFile = await KnowledgeBase.findOne({
          _id: ObjectId(knowledgeBaseId),
        });
        let authorKnowLedge = KnowledgeBaseFileData;
        authorKnowLedge.author_id = user_id;
        let file = [];

        baseFile.files.forEach((item) => {
          file.push(item);
        });

        file.push(authorKnowLedge);

        await KnowledgeBase.findOneAndUpdate(
          { _id: knowledgeBaseId },
          { $set: { files: file } }
        );
        const base = await Tasks.findOne({ _id: ObjectId(knowledgeBaseId) });
        return base;
      } catch (err) {
        return new Error(err);
      }
    },
    refreshToken: async (_, { token }) => {
      try {
        const { user_id, role_id } = jwt.decode(token, process.env.JWT_SECRET);

        const newtoken = jwt.sign({ role_id, user_id }, process.env.JWT_SECRET);

        return newtoken;
      } catch (err) {
        return new Error(err);
      }
    },
  },
};
