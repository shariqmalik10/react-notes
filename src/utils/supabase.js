import { createClient } from "@supabase/supabase-js";
import dotenv  from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
// import 'dotenv.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '..', '..', '.env');
dotenv.config({path: envPath});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log(`the path to .env is: ${envPath}`);
export const supabase = createClient(supabaseUrl, supabaseKey);
