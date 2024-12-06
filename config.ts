const environments = {
    qa: 'https://core-mysearch-rest-api.us-west-2.qa.apfmtech.com',
    dev: 'https://core-mysearch-rest-api.us-west-2.dev.apfmtech.com',
    prod: 'https://core-mysearch-rest-api.us-west-2.prod.apfmtech.com',
  };

  // const environmentsFamilyFile = {
  //   qa: 'https://owl-familyfile.internal.qa.aplaceformom.com',
  //   dev: 'https://owl-familyfile.internal.dev.aplaceformom.com',
  //   prod: 'https://owl-familyfile.internal.prod.aplaceformom.com',
  // };
  
  export const config = {
    baseURL: environments[process.env.ENV || 'qa'], // Default to QA if ENV is not set
  };
  
  // export const configFamilyFile = {
  //   baseURL: environmentsFamilyFile[process.env.ENV || 'qa'], // Default to QA if ENV is not set
  // };

  require('dotenv').config();
