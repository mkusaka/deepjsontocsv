# deepjsontocsv

A TypeScript utility for converting deeply nested JSON objects or arrays into CSV format. This library flattens nested objects and arrays, allowing you to easily generate CSV files from complex JSON structures.

## Features

- Converts both a single JSON object and an array of JSON objects into CSV.
- Handles nested objects and arrays, flattening them into a single level.
- Automatically generates headers based on the JSON structure.
- Flexible and supports optional or undefined values in JSON.
- CLI support for converting JSON to CSV directly from the terminal.

## Installation

You can install the package via npm:

```bash
npm install deepjsontocsv
```

## Usage

### Basic Example

Here’s an example of how to use the library:

```tsx
import { jsonToCsv } from "deepjsontocsv";

const jsonObject = {
  album: "The White Stripes",
  year: 1999,
  US_peak_chart_post: "-",
  main_actor: {
    name: "Jack White",
    birth: "1975",
  },
  actors: [
    {
      name: "Jack White",
      birth: "1975",
    },
  ],
};

const csvResult = jsonToCsv(jsonObject);
console.log(csvResult);
```

Output:

```csv
album,year,US_peak_chart_post,main_actor.name,main_actor.birth,actors[0].name,actors[0].birth
The White Stripes,1999,-,Jack White,1975,Jack White,1975
```

### Working with Arrays

If you have an array of JSON objects, the library will handle it seamlessly:

```tsx
const jsonArray = [
  {
    album: "The White Stripes",
    year: 1999,
    US_peak_chart_post: "-",
    main_actor: {
      name: "Jack White",
      birth: "1975",
    },
    actors: [
      {
        name: "Jack White",
        birth: "1975",
      },
    ],
  },
  {
    album: "De Stijl",
    year: 2000,
    US_peak_chart_post: "-",
  },
];

const csvResult = jsonToCsv(jsonArray);
console.log(csvResult);
```

Output:

```csv
album,year,US_peak_chart_post,main_actor.name,main_actor.birth,actors[0].name,actors[0].birth
The White Stripes,1999,-,Jack White,1975,Jack White,1975
De Stijl,2000,-,,,,
```

### Handling Undefined or Missing Fields

The library gracefully handles undefined or missing fields, ensuring the output remains valid.

```tsx
const jsonArrayWithMissingFields = [
  {
    album: "De Stijl",
    year: 2000,
    US_peak_chart_post: "-",
  },
];

const csvResult = jsonToCsv(jsonArrayWithMissingFields);
console.log(csvResult);
```

Output:

```csv
album,year,US_peak_chart_post
De Stijl,2000,-

```

## CLI Usage

Once installed globally, you can use `deepjsontocsv` directly from the command line to convert JSON files into CSV
files.

### Basic CLI Usage

```bash
deepjsontocsv <input-json-file> [output-csv-file]

```

- **`input-json-file`**: The path to the input JSON file that you want to convert.
- **`output-csv-file`** (optional): The path to save the CSV file. If this argument is not provided, the CSV output will
  be printed to the console.

### CLI Examples

1. **Convert JSON to CSV and print to console**:

```bash
deepjsontocsv input.json
```

This will convert the `input.json` file to CSV format and print the CSV output to the console.

2. **Convert JSON to CSV and save to file**:

```bash
deepjsontocsv input.json output.csv
```

This will convert the `input.json` file to CSV format and save it as `output.csv`.

3. **Show the CLI version**:

You can check the version of the CLI using the `--version` flag:

```bash
deepjsontocsv --version
```

4. **Display help**:

Use the `--help` flag to see available options:

```bash
deepjsontocsv --help
```

Output:

```bash
Usage: deepjsontocsv [options] <input-json-file> [output-csv-file]

A CLI tool to convert deep JSON objects to CSV format.

Arguments:
  input-json-file         The path to the input JSON file to convert
  output-csv-file         Optional: The path to save the output CSV file. If not provided, the output will be printed to stdout.

Options:
  -V, --version           output the version number
  -h, --help              display help for command

```

## API

### `jsonToCsv(json: JsonObject | JsonObject[]): string`

- **Parameters:**
  - `json`: A single JSON object or an array of JSON objects to be converted into CSV.
- **Returns:**
  - A string in CSV format representing the input JSON data.

## Type Definitions

The following types are used by the library:

```tsx
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
```

## Limitations

- Arrays inside JSON are indexed and flattened. For example, an array like `actors` will be represented as
  `actors[0].name`, `actors[1].name`, etc.
- Only primitive values (`string`, `number`, `boolean`, `null`, `undefined`) are supported as leaf nodes in the JSON
  structure.

## License

This project is licensed under the MIT License.
