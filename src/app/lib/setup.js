import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupEnv() {
  try {
    // Read YAML file
    const configPath = path.resolve('/app/config.yml');
    const yamlContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(yamlContent);

    // Create environment variables object
    const envVars = {
      STAGE: config.ENVIRONMENT.STAGE,
      APP_URL: config.APP.URL,
      APP_SECRET: config.APP.SECRET
    };

    // Create .env.local file
    const envContent = [
      `AUTH_SECRET=${envVars.APP_SECRET}`,
      'NEXTAUTH_TRUST_HOST=true',
      `NEXTAUTH_URL=${envVars.APP_URL}`,
      'NEXT_TELEMETRY_DISABLED=1'
    ].join('\n');

    // Write to .env.local file
    fs.writeFileSync('/app/.env.local', envContent);
    
    // Create export commands for shell
    const exportCommands = [
      '#!/bin/sh',
      Object.entries(envVars)
        .map(([key, value]) => `export ${key}=${value ? `"${value}"` : '""'}`)
        .join('\n'),
      // Add the Next.js specific variables
      'export AUTH_SECRET="${APP_SECRET}"',
      'export NEXTAUTH_TRUST_HOST=true',
      'export NEXTAUTH_URL="${APP_URL}"',
      'export NEXT_TELEMETRY_DISABLED=1'
    ].join('\n');

    // Write export commands to a temporary shell script
    fs.writeFileSync('/app/app/lib/export_env.sh', exportCommands);
    // Make the script executable
    fs.chmodSync('/app/app/lib/export_env.sh', '755');

    // Set process.env variables
    Object.entries(envVars).forEach(([key, value]) => {
      process.env[key] = value;
    });

    console.log('✔ Environment variables successfully configured');
    return envVars;
  } catch (error) {
    console.error('✘ Error setting up environment:', error.message);
    process.exit(1);
  }
}

// Export as default for ES6 modules
export default setupEnv;

// Execute if running directly (ES6 module equivalent of require.main === module)
if (import.meta.url === `file://${process.argv[1]}`) {
  setupEnv();
}