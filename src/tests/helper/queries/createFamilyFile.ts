export const mutation = `
      mutation CreateFFAutoRefer($createFamilyFileInput: CreateFamilyFileInput) {
        createFamilyFile(input: $createFamilyFileInput) {
          familyFileId
          externalId
          leadqueueLeadId
          originalLeadqueueLeadId
          isHomecare
          twoFAuthMethodCompleted
          isDigitalReferQuestionsCompleted
          isDigitalReferOptIn
          questionsData {
            formDataId
          }
          mySearchUrl
          blacklistedCommunities {
            desiredZip
            id
          }
          communities {
            id
          }
        }
      }
    `;

export const variables = {
  createFamilyFileInput: {
    
    isDigitalReferQuestionsCompleted: true,
    twoFAuthMethodCompleted: "SMS",
    assignToSelf: true,
    longTermCare: "HAS_POLICY",
    behavioral: null,
    behaviorals: [],
    budgetMax: null,
    budgetMin: null,
    careTypeCode: [],
    desiredCity: "Olathe",
    desiredPostalCode: "66061",
    desiredState: "KS",
    diabetic: null,
    emailAddresses: [
      {
        emailAddress: "william1@nerderium.com",
        isPrimary: true,
      },
    ],
    firstName: "mister",
    lastName: "elminster",
    getAround: null,
    healthIssues: "",
   
    isDiabeticCare: null,
    isHealthcare: false,
    isHousekeeping: null,
    isIcPrefill: true,
    isMedication: null,
    isSLPP: false,
    isSocialActivities: null,
    isSpecialDiet: null,
    isUrgent: null,
    locationRange: 15,
    locationCurrentlyLiving: null,
    lookingReason: "OTHER",
    medicaid: null,
    moveDateRange: null,
    notes: [],
    phones: [
      {
        areaCode: "913",
        country: "US",
        isPrimary: true,
        localNumber: "2310072",
        subCategory: "CELL_PHONE",
      },
    ],
    relationToResident: "DAUGHTER",
    relationshipToResidentDetail: null,
    resident1FirstName: "mister",
    resident1Gender: null,
    resident1LastName: "grinchiestest",
    resident2Age: null,
    resident2FirstName: null,
    resident2Gender: null,
    resident2LastName: null,
    roomPreference: [],
    skipEvent: false,
    sourceId: 38,
    sourceSubId: 6257,
    submissionUrl:
      "https://www.aplaceformom.com/independent-living/virginia/front-royal",
    treatmentPreference: null,
    veteran: null,
  
    isHomecare: false,
    communities: [
      {
        id: 158212,
        relativeRank: 1,
        relevancy: 0.5,
        relevancyLabel: "great",
        algoValue: {
          shapValues: [
            {
              feature: "distance",
              value: "3.49",
              shapValue: 3.385037648800125,
            },
          ],
        },
      },
      {
        id: 1441280,
        relativeRank: 2,
        relevancy: 0.1,
        relevancyLabel: "great",
        algoValue: {
          shapValues: [
            {
              feature: "distance",
              value: "3.49",
              shapValue: 3.385037648800125,
            },
          ],
        },
      },
      {
        id: 1441282,
        relativeRank: 3,
        relevancy: 0.5,
        relevancyLabel: "good",
        algoValue: {
          shapValues: [
            {
              feature: "distance",
              value: "3.49",
              shapValue: 3.385037648800125,
            },
          ],
        },
      },
      {
        id: 158213,
        relativeRank: 4,
        relevancy: 2,
        algoValue: {
          shapValues: [
            {
              feature: "distance",
              value: "3.49",
              shapValue: 3.385037648800125,
            },
          ],
        },
      },
      {
        id: 1407268,
        relativeRank: 5,
        relevancy: 2,
        algoValue: {
          shapValues: [
            {
              feature: "distance",
              value: "3.49",
              shapValue: 3.385037648800125,
            },
          ],
        },
      },
    ],
  },
};
