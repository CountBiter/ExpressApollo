import { Organisations } from "../database/dbConnector.js";

export const resolves ={
    Query:{
        getOrganisations: (root) =>{
            return new Promise((resolve, reject) =>{
                Organisations.find((err, orgs) =>{
                    if (err) reject(err);
                    else resolve(orgs)
                });
            });
        },
        findOrganisation: (root, {id}) =>{
            return new Promise((resolve, reject) =>{
                Organisations.findOne({_id: id}, (err, org) =>{
                    if (err) reject(err);
                    else resolve(org)
                });
            });
        }
    },
    Mutation:{
        addOrganisation: (root, { org }) =>{
            const rest = org;
            const newOrg = new Organisations(rest);

            return new Promise((resolve, reject) =>{
                newOrg.save((err, org) =>{
                    if (err) reject(err);
                    else resolve(org)
                });
            });
        }
    }
}