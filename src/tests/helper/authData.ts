import { faker } from "@faker-js/faker";

export const generateCustomEmail = () => {
  const firstName = faker.person.firstName().toLowerCase();
  const lastName = faker.person.lastName().toLowerCase();
  const randomNumbers = faker.number.int({ min: 100000, max: 999999 }); // Generates 3 random digits
  const domain = "apfmqa.com";

  return `${firstName}.${lastName}${randomNumbers}@${domain}`;
};
