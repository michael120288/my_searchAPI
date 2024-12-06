import { createFamilyFile } from "./../helper/createFamilyFile";
import { generateToken } from "../helper/tokenGenerator";
import { generateCustomEmail } from "../helper/authData";
process.env.MY_SEARCH_TOKEN
describe("GraphQL CreateFamilyFile Mutation", () => {
  it("create token", async () => {
    const email = generateCustomEmail();
    console.log(email);
    const response = await createFamilyFile();
    console.log(response.body);
    const familyFileId = response.body.data.createFamilyFile.familyFileId;
    const token = generateToken(email, familyFileId);
    process.env.MY_SEARCH_TOKEN = token;
    console.log(token);
    expect(response.statusCode).toBe(200); // Ensure the response status is 200
    expect(response.body.data).toHaveProperty("createFamilyFile"); // Ensure the mutation returns data
    expect(response.body.data.createFamilyFile).toHaveProperty("familyFileId"); // Ensure familyFileId exists
  });
});
