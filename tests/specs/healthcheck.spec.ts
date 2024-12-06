import * as supertest from "supertest";
import { config } from "../config/config";
import { request } from "../helper/setup";
// const request = supertest(config.baseURL);
describe("healthcheck", () => {
  it("healthcheck", async () => {
    const response = await request.get("/healthcheck");
    console.log(response.request.url);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("OK");
  });
});
