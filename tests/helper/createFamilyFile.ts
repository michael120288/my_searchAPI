import { mutation, variables } from "../helper/queries/createFamilyFile";
import * as supertest from "supertest";
const URL = `https://owl-familyfile.internal.${process.env.ENV}.aplaceformom.com`
const request = supertest(
    URL
);
export function createFamilyFile() {
    return request
    .post(`/graphql`)
    .send({ query:mutation, variables })
    .set('Content-Type', 'application/json');
};

