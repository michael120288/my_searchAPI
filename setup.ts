import * as supertest from 'supertest';
import { config } from 'dotenv';

config({ path: `./env/.env.${process.env.ENV || 'qa'}` }); // Load environment variables based on ENV

if (!process.env.BASE_URL) {
  throw new Error('BASE_URL is not defined. Check your environment configuration.');
}

export const request = supertest(process.env.BASE_URL);

console.log(`Supertest is using BASE_URL: ${process.env.BASE_URL}`);