import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { z } from 'zod';

const configPath = path.resolve(process.cwd(), 'config.yml');

if (!fs.existsSync(configPath)) {
  console.error("config.yml is not found");
  process.exit(1);
}

const fileContents = fs.readFileSync(configPath, 'utf8');
const parsedYaml = YAML.parse(fileContents);

const configSchema = z.object({
  core: z.object({
    port: z.number().int().positive().default(3000),
    debug: z.boolean().default(false),
  }),
  plugins: z.object({
    enable_console_logger: z.boolean().default(true),
    enable_sqlite_history: z.boolean().default(false),
  }).default({}),
});

const envParsed = configSchema.safeParse(parsedYaml);

if (!envParsed.success) {
  console.error('config.yml is not correct');
  console.error(JSON.stringify(envParsed.error.format(), null, 2));
  process.exit(1);
}

export const config = envParsed.data;