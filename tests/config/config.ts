const environments = {
    qa: 'https://core-mysearch-rest-api.us-west-2.qa.apfmtech.com',
    dev: 'https://core-mysearch-rest-api.us-west-2.dev.apfmtech.com',
    prod: 'https://core-mysearch-rest-api.us-west-2.prod.apfmtech.com',
  };
  
  export const config = {
    baseURL: environments[process.env.ENV || 'qa'], // Default to QA if ENV is not set
  };