import { execSync } from 'child_process'; //runs shell command
import path from 'path'; //handles file paths
import { fileURLToPath } from 'url'; //converts es module urls to file paths
import { config } from 'dotenv'; //loads .env files

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from project root
config({ path: path.resolve(__dirname, '../.env') });

//array of command line arguments -> argv[2]
const command = process.argv[2];
const validCommands = ['up', 'down', 'create'];

//Basic validation — reject invalid commands
if (!validCommands.includes(command)) {
  console.error(`Usage: node migrate.js <${validCommands.join('|')}> [name]`);
  process.exit(1);
}

//For create, we pass an optional name. Otherwise just pass up or down.
const args = command === 'create' ? `create ${process.argv[3] || 'migration'}` : command;

//Runs node-pg-migrate with:
execSync(`npx node-pg-migrate ${args}`, {
  stdio: 'inherit', //shows output in your terminal
  cwd: __dirname, //runs from /server directory
  env: { ...process.env }, //passes all environment variables
});
