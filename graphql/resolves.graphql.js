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
} from "../database/dbConnector.js";
import { ObjectId } from "mongodb";

export const resolvers = {
  Query: {
    getAllOrganisations: async () => {
      try {
        return await Organisations.find();
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
    getAllTasks: async () => {
      try {
        return await Tasks.find();
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
        await Organisations.updateOne({ _id: ObjectId(orgId) }, updateData);

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
    getRole: async (_, { roleId }) => {
      try {
        const findRole = await Roles.findOne({ _id: ObjectId(roleId) });
        return findRole;
      } catch (err) {
        return new Error(err);
      }
    },
    addRoles: async (_, { roles, rolesTasks }) => {
      try {
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
    getUser: async (_, { userId }) => {
      try {
        return await User.findOne({ _id: ObjectId(userId) });
      } catch (err) {
        return new Error(err);
      }
    },
    addUsers: async (_, { user }) => {
      try {
        const newUser = new User(user);

        await newUser.save();

        return newUser;
      } catch (err) {
        return new Error(err);
      }
    },
    updateUser: async (_, { userId, updateData }) => {
      try {
        await User.findOneAndUpdate({ _id: ObjectId(userId) }, updateData);

        const updateUser = await User.findOne({ _id: ObjectId(userId) });

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
    getUserRole: async (_, { userRoleId }) => {
      try {
        return await UserRoles.findOne({ _id: ObjectId(userRoleId) });
      } catch (err) {
        return new Error(err);
      }
    },
    addUserRoles: async (_, { roleId, userId }) => {
      try {
        let userRole = { user_id: roleId, role_id: userId };
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
            console.log(NewRoles[key]);
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
    addContacts: async (_, { newContact, typeCI }) => {
      try {
        let contact = newContact;
        newContact.type_ci = typeCI;

        const newContacts = new Contacts(contact);
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
    getTask: async (_, { taskId }) => {
      try {
        return await Tasks.findOne({ _id: ObjectId(taskId) });
      } catch (err) {
        return new Error(err);
      }
    },
    addTask: async (_, { taskData }) => {
      try {
        const newTask = new Tasks(taskData);
        newTask.save();

        return newTask;
      } catch (err) {
        return new Error(err);
      }
    },
    updateTask: async (_, { taskId, newTaskData }) => {},
    deleteTask: async (_, { taskId }) => {
      try {
        await Tasks.deleteOne({ _id: ObjectId(tassId) });

        return "Task deleted";
      } catch (err) {
        return new Error(err);
      }
    },
    addParamsToTask: async (_, { taskId, paramsData, taskFile }) => {
      try {
        const newParams = paramsData
        const task = await Tasks.findOneAndUpdate({_id: ObjectId(taskId)}, {$set: {files: taskFile}})
      } catch (err) {
        return new Error(err)
      }
    },
  },
};
