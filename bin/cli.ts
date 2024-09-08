#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { jsonToCsv } from '../main'; // Adjust this path based on your project structure
import { resolve } from 'path';

function displayHelp() {
    console.log(`
Usage: deepjsontocsv <input-json-file> [output-csv-file]

Arguments:
  input-json-file      The path to the input JSON file to convert.
  output-csv-file      (Optional) The path to save the output CSV file. If not provided, it will print to stdout.

Options:
  -h, --help           Show this help message.
  `);
}

function run() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
        displayHelp();
        return;
    }

    const inputFile = resolve(args[0]);
    const outputFile = args[1] ? resolve(args[1]) : null;

    try {
        const inputData = readFileSync(inputFile, 'utf-8');
        const jsonObject = JSON.parse(inputData);
        const csvOutput = jsonToCsv(jsonObject);

        if (outputFile) {
            writeFileSync(outputFile, csvOutput, 'utf-8');
            console.log(`CSV written to ${outputFile}`);
        } else {
            console.log(csvOutput);
        }
    } catch (error) {
        console.error('Error:', (error as Error).message);
    }
}

run();
