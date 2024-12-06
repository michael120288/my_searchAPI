import { request } from "../../setup";
describe("healthcheck", () => {
  it("healthcheck", async () => {
    const response = await request.get("/healthcheck");
    console.log(response.request.url);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("OK");
  });
});
