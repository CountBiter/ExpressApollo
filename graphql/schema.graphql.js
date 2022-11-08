import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Organisations{
        id: ID!
        title: String
        full_name: String
        icon: String
        idfification_number: String
        kpp: String
        oked: String
    }

    input OrganisationInput{
        title: String
        full_name: String
        icon: String
        idfification_number: String
        kpp: String
        oked: String
    }

    type Query{
        getOrganisations: [Organisations]
        findOrganisation(id: String): Organisations
    }

    type Mutation{
        addOrganisation(org: OrganisationInput): Organisations
    }

`;