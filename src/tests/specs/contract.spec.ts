import { request } from "../../../setup";
const db = require("../../db");
import * as xlsx from "xlsx";
import * as fs from "fs-extra";
import * as path from "path";

describe("contract", () => {
  let pool: any; // To hold the database connection

  afterAll(async () => {
    if (pool) {
      await pool.close(); // Ensure database connection is closed after all tests
    }
  });

  it.skip("should process XLSX file and save JSON", async () => {
    // --- XLSX FILE HANDLING ---
    // Path to the XLSX file
    const filePath: string = path.resolve(
      __dirname,
      "../data/contractLastVersion.xlsx"
    );
    // Read the XLSX file
    const workbook: xlsx.WorkBook = xlsx.readFile(filePath);
    // Get the first sheet
    const sheetName: string = workbook.SheetNames[0];
    const worksheet: xlsx.WorkSheet = workbook.Sheets[sheetName];
    // Convert to JSON
    const jsonData: any[] = xlsx.utils.sheet_to_json(worksheet);

    console.log(jsonData);

    const outputPath: string = path.resolve(
      __dirname,
      "../output/contracts2.json"
    );
    // Ensure the output folder exists
    await fs.ensureDir(path.dirname(outputPath));
    // Save JSON file
    await fs.writeJson(outputPath, jsonData, { spaces: 2 });

    console.log(`JSON file saved at: ${outputPath}`);
  }, 100000); // Increase timeout to handle potential delays

  it.skip("should process SQL database Contracts2025 and save JSON", async () => {
    pool = await db;
    const result: any = await pool
      .request()
      .query("select * from apfm.Contracts2025");
    console.log(result.recordsets[0]);

    const outputFilePath: string = path.resolve(
      __dirname,
      "../output/contract2025Version2.json"
    );

    // Step 4: Write data to a JSON file
    await fs.ensureDir(path.dirname(outputFilePath)); // Ensure output directory exists
    await fs.writeJson(outputFilePath, result, { spaces: 2 }); // Save JSON with formatting

    console.log(`Data saved to: ${outputFilePath}`);
  }, 100000);

  it.skip("should process SQL database Contract_Clause and save JSON", async () => {
    pool = await db;
    const result: any = await pool
      .request()
      .query("select * from apfm.Contract_Clause");
    console.log(result.recordsets[0]);

    const outputFilePath: string = path.resolve(
      __dirname,
      "../output/contractClauseVersion2.json"
    );

    // Step 4: Write data to a JSON file
    await fs.ensureDir(path.dirname(outputFilePath)); // Ensure output directory exists
    await fs.writeJson(outputFilePath, result, { spaces: 2 }); // Save JSON with formatting

    console.log(`Data saved to: ${outputFilePath}`);
  }, 100000);

  it.skip("should process SQL database Contract and save JSON", async () => {
    pool = await db;
    const result: any = await pool
      .request()
      .query("select * from apfm.Contract");
    console.log(result.recordsets[0]);

    const outputFilePath: string = path.resolve(
      __dirname,
      "../output/ContractVersion2.json"
    );

    // Step 4: Write data to a JSON file
    await fs.ensureDir(path.dirname(outputFilePath)); // Ensure output directory exists
    await fs.writeJson(outputFilePath, result, { spaces: 2 }); // Save JSON with formatting

    console.log(`Data saved to: ${outputFilePath}`);
  }, 100000);

  // Load JSON files
  const contracts: any[] = require("../output/contracts2.json");
  const contract: any = require("../output/ContractVersion2.json");
  const contract2025: any = require("../output/contract2025Version2.json");
  const contractClause: any = require("../output/contractClauseVersion2.json");
  let count = 0;
  // Utility function to compare dates
  function isDateAfter(date: string, comparisonDate: string): boolean {
    return new Date(date) > new Date(comparisonDate);
  }
  // Test function
  it.only("verify data from xlsx and mysql", async () => {
    // Iterate over contracts from the xlsx file
    contracts.forEach((xlsxRecord: any) => {
      const contractID: number = xlsxRecord["contract_id"];
      const currentRate: number = xlsxRecord["old_rate"];
      const newTier: number = xlsxRecord["new_rate"];

      // Log the contract being verified
      console.log(`Verifying Contract ID: ${contractID}`);

      // Verify in Contract.json
      verifyContractJson(contract, contractID);

      // Verify in contractClause
      verifyContractClause(contractClause, contractID, currentRate, newTier);
    });
  });

  function verifyContractJson(contract: any, contractID: number): void {
    if (
      contractID === 48419 ||
      contractID === 48700 ||
      contractID === 59110 ||
      contractID === 21616 ||
      contractID === 16868
    ) {
      console.log(`Skipping verification for Contract ID: ${contractID}`);
      return;
    }
    const match: any = contract.recordsets[0].find(
      (contractRecord: any) => contractRecord["contract_id"] === contractID
    );
    if (match) {
      expect(match["contract_id"]).toBe(contractID);
      expect(match["note"]).toContain("Updated pricing for 2025");
    } else {
      //count++
      console.error(`Contract ID ${contractID} not found in Contract.json.`);
    }
  }

  function verifyContractClause(
    contractClause: any,
    contractID: number,
    currentRate: number,
    newTier: number
  ): void {
    const matches: any[] = contractClause.recordsets[0].filter(
      (cClause: any) => cClause["contract_id"] === contractID
    );
    console.log(contractClause.recordsets[0], "contractClause.recordsets[0]");
    console.log(contractID, "contractID");
    console.log(currentRate, "currentRate");
    console.log(newTier, "newTier");
    matches.forEach((cClause: any) => {
      // Verify current rate clauses

      if (cClause["contract_clause_type_code"] === `${currentRate}`) {
        if (!cClause["updated_on"].includes("2024-12-31")) {
          console.log(cClause, "cClause");
          expect(
            cClause["end_date"] === "2025-01-02T23:59:00.000Z"
          ).toBeTruthy();
        }
      }

      // Verify new tier clauses
      if (contractID === 50157 || contractID === 48114) {
        console.log(`Skipping verification for Contract ID: ${contractID}`);
        return;
      }
      if (
        cClause["contract_clause_type_code"] === `${newTier}` &&
        isDateAfter(cClause["start_date"], "2025-01-01") &&
        cClause["created_by"] === "admin"
      ) {
        console.table(cClause);
        expect(cClause["contract_clause_notes"]).toBe(
          "Change in billing terms"
        );
        expect(cClause["start_date"]).toBe("2025-01-03T00:00:00.000Z");
        expect(cClause["end_date"]).toBeNull();
      }
    });

    if (matches.length === 0) {
      count++;
      console.error(
        `No clauses found for Contract ID ${contractID} in contractClause.json.`
      );
    }
    if (count > 0) {
      console.log(`${count} contract ID(s) not found in contractClause.json.`);
    }
  }
});
