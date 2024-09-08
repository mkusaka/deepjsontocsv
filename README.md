# deepjsontocsv

A TypeScript utility for converting deeply nested JSON objects or arrays into CSV format. This library flattens nested objects and arrays, allowing you to easily generate CSV files from complex JSON structures.

## Features

- Converts both a single JSON object and an array of JSON objects into CSV.
- Handles nested objects and arrays, flattening them into a single level.
- Automatically generates headers based on the JSON structure.
- Flexible and supports optional or undefined values in JSON.

## Installation

You can install the package via npm:

```bash
npm install deepjsontocsv
```

## Usage

### Basic Example

Here’s an example of how to use the library:

```tsx
import { jsonToCsv } from 'deepjsontocsv';

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
typescript
Copy code
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

## API

### `jsonToCsv(json: JsonObject | JsonObject[]): string`

- **Parameters:**
    - `json`: A single JSON object or an array of JSON objects to be converted into CSV.
- **Returns:**
    - A string in CSV format representing the input JSON data.

## Type Definitions

The following types are used by the library:

```tsx
type JsonValue = string | number | boolean | null | undefined | JsonObject | JsonValue[];
interface JsonObject {
    [key: string]: JsonValue;
}

```

## Limitations

- Arrays inside JSON are indexed and flattened. For example, an array like `actors` will be represented as `actors[0].name`, `actors[1].name`, etc.
- Only primitive values (`string`, `number`, `boolean`, `null`, `undefined`) are supported as leaf nodes in the JSON structure.

## License

This project is licensed under the MIT License.
