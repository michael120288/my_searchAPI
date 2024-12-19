import { createFamilyFile } from "./../helper/createFamilyFile";
import { generateToken } from "../helper/tokenGenerator";
import { generateCustomEmail } from "../helper/authData";
import { verifyToken } from "../helper/verifyToken";
import { request } from "../../setup";

process.env.MY_SEARCH_TOKEN;
let resBodyEmail: string 
let resBodyFamilyFileId: string 

describe("GraphQL CreateFamilyFile Mutation", () => {
  beforeAll(async () => {
    try {
      // Generate a custom email
      const email = generateCustomEmail();
      console.log(`[INFO] Generated Email: ${email}`);

      // Create a family file using the mutation
      const response = await createFamilyFile();
      console.log(`[DEBUG] CreateFamilyFile Response:`, JSON.stringify(response.body, null, 2));

      // Assign values based on response structure
      resBodyEmail = response.body.data?.createFamilyFile?.emailAddress || email;
      resBodyFamilyFileId = response.body.data?.createFamilyFile?.familyFileId;

      // Ensure values are properly set
      expect(resBodyEmail).toBeDefined();
      expect(resBodyFamilyFileId).toBeDefined();

      // Generate a token using the email and familyFileId
      const token = generateToken(resBodyEmail, resBodyFamilyFileId);

      // Set the token as an environment variable
      process.env.MY_SEARCH_TOKEN = token;
      console.log(`[INFO] Generated Token: ${token}`);

      // Validate the token
      const isValid = verifyToken(token);
      expect(isValid).toBe(true);
    } catch (error) {
      console.error(`[ERROR] Test failed:`, error);
      throw error;
    }
  });

  it("C75939 Edit tokencheck - verify token that it was created correctly", async () => {
    try {
      const token = process.env.MY_SEARCH_TOKEN;
      if (!token) {
        throw new Error("[ERROR] Token is not set. Test failed.");
      }

      const response = await request.post("/tokencheck").send({ token });
      console.log(`[DEBUG] Token Check Response:`, JSON.stringify(response.body, null, 2));

      // Ensure token data matches expected values
      expect(response.body.token.email).toBe(resBodyEmail);
      expect(response.body.token.familyFileId).toBe(resBodyFamilyFileId);
    } catch (err) {
      console.error(`[ERROR] Test failed:`, err);
      throw err;
    }
  });
});