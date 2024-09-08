import { stringify } from "csv-stringify/sync";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonObject
  | JsonValue[];

interface JsonObject {
  [key: string]: JsonValue;
}

// Function to flatten nested objects/arrays into a single-level structure
function flattenJson(data: JsonObject | JsonObject[]): Record<string, string> {
  const result: Record<string, string> = {};

  function recursiveFlatten(value: JsonValue, currentKey: string = ""): void {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.entries(value).forEach(([key, val]) => {
        recursiveFlatten(val, currentKey ? `${currentKey}.${key}` : key);
      });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        recursiveFlatten(item, `${currentKey}[${index}]`);
      });
    } else {
      result[currentKey] = value !== null ? String(value) : "";
    }
  }

  recursiveFlatten(data);
  return result;
}

// Function to convert JSON to CSV using `csv-stringify`
export function jsonToCsv(json: JsonObject | JsonObject[]): string {
  const jsonArray = Array.isArray(json) ? json : [json]; // Ensure we work with an array

  // Collect all possible headers
  const headersSet = new Set<string>();
  const flattenedRows: Record<string, string>[] = [];

  // Process each JSON object and flatten it
  jsonArray.forEach((jsonObject) => {
    const flattened = flattenJson(jsonObject);
    Object.keys(flattened).forEach((key) => headersSet.add(key));
    flattenedRows.push(flattened);
  });

  // Convert the header set to an array
  const headers = Array.from(headersSet);

  // Use `csv-stringify` to convert the flattened data to CSV
  const csvOutput = stringify(flattenedRows, {
    header: true, // Include the headers
    columns: headers, // Specify the headers for the CSV
  });

  return csvOutput;
}
