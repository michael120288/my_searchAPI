import * as supertest from "supertest";
import { config } from "./config"; // Ensure your config file has the baseURL property

const request = supertest(config.baseURL);

export { request };
