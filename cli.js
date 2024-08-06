// cli.js
import { Command } from 'commander';
import inquirer from 'inquirer';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

const program = new Command();
const apiUrl = 'http://localhost:3000';

const saveDataFile = path.join(process.cwd(), 'data.json');

// Helper function to make API calls
const apiCall = async (endpoint, method = 'GET', data = {}) => {
  try {
    const response = await axios({ method, url: `${apiUrl}/${endpoint}`, data });
    return response.data;
  } catch (error) {
    console.error(`Error: ${error.response?.data?.message || error.message}`);
  }
};

// Create a new pet
program
  .command('create')
  .description('Create a new pet')
  .option('--name <name>', 'Name of the pet')
  .option('--type <type>', 'Type of the pet (e.g., Cat, Dog)')
  .option('--color <color>', 'Color of the pet')
  .action(async (options) => {
    const data = { name: options.name, type: options.type, color: options.color };
    await apiCall('pets', 'POST', data);
    console.log('Pet created successfully.');
  });

// Feed the pet
program
  .command('feed')
  .description('Feed the pet')
  .action(async () => {
    await apiCall('feed', 'POST');
    console.log('Pet fed successfully.');
  });

// Play with the pet
program
  .command('play')
  .description('Play with the pet')
  .action(async () => {
    await apiCall('play', 'POST');
    console.log('Played with the pet successfully.');
  });

// Train the pet
program
  .command('train')
  .description('Train the pet')
  .action(async () => {
    await apiCall('train', 'POST');
    console.log('Pet trained successfully.');
  });

// Check pet's status
program
  .command('status')
  .description('Check the pet\'s status')
  .action(async () => {
    const status = await apiCall('status');
    console.log('Pet Status:', status);
  });

// Save the pet's progress
program
  .command('save')
  .description('Save the pet\'s progress')
  .action(() => {
    fs.copyFileSync('./data.json', saveDataFile);
    console.log('Pet\'s progress saved.');
  });

// Load the pet's progress
program
  .command('load')
  .description('Load the pet\'s progress')
  .action(() => {
    fs.copyFileSync(saveDataFile, './data.json');
    console.log('Pet\'s progress loaded.');
  });

program.parse(process.argv);
