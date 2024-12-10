import { createFamilyFile } from "./../helper/createFamilyFile";
import { generateToken } from "../helper/tokenGenerator";
import { generateCustomEmail } from "../helper/authData";
import { verifyToken } from "../helper/verifyToken";
process.env.MY_SEARCH_TOKEN
describe("GraphQL CreateFamilyFile Mutation", () => {
  it("C75929 Token generated", async () => {
    try {
      // Generate a custom email
      const email = generateCustomEmail();
      console.log(`[INFO] Generated Email: ${email}`);

      // Create a family file using the mutation
      const response = await createFamilyFile();
      console.log(`[DEBUG] CreateFamilyFile Response:`, response.body);

      // Validate response status
      expect(response.statusCode).toBe(200);

      // Extract familyFileId from the response
      const familyFileId = response.body.data?.createFamilyFile?.familyFileId;
      expect(familyFileId).toBeDefined();

      // Generate a token using the email and familyFileId
      const token = generateToken(email, familyFileId);

      // Set the token as an environment variable
      process.env.MY_SEARCH_TOKEN = token;
      console.log(`[INFO] Generated Token: ${token}`);

      // Validate the token
      const isValid = verifyToken(token);
      expect(isValid).toBe(true);

      // Validate the response structure
      expect(response.body.data).toHaveProperty("createFamilyFile");
      expect(response.body.data.createFamilyFile).toHaveProperty("familyFileId");
    } catch (error) {
      console.error(`[ERROR] Test failed:`, error);
      throw error; // Ensure the test fails on error
    }
  });
});
