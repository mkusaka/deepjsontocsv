#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { jsonToCsv } from '../main'; // Adjust this path based on your project structure
import { resolve } from 'path';
import { Command } from 'commander';
import { version } from '../package.json'; // Import version from package.json

const program = new Command();

program
    .name('deepjsontocsv')
    .description('A CLI tool to convert deep JSON objects to CSV format.')
    .version(version)
    .argument('<input-json-file>', 'The path to the input JSON file to convert')
    .argument('[output-csv-file]', 'Optional: The path to save the output CSV file. If not provided, the output will be printed to stdout.')
    .action((inputFile, outputFile) => {
        try {
            const resolvedInputFile = resolve(inputFile);
            const inputData = readFileSync(resolvedInputFile, 'utf-8');
            const jsonObject = JSON.parse(inputData);
            const csvOutput = jsonToCsv(jsonObject);

            if (outputFile) {
                const resolvedOutputFile = resolve(outputFile);
                writeFileSync(resolvedOutputFile, csvOutput, 'utf-8');
                console.log(`CSV written to ${resolvedOutputFile}`);
            } else {
                console.log(csvOutput);
            }
        } catch (error) {
            console.error('Error:', (error as Error).message);
        }
    });

program.parse(process.argv);
