import fs from 'fs';

// Parse .env file
const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

const url = `${env.VITE_SUPABASE_URL}/rest/v1/`;

async function getSwagger() {
  try {
    const res = await fetch(url, {
      headers: {
        'apikey': env.VITE_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${env.VITE_SUPABASE_ANON_KEY}`
      }
    });
    const data = await res.json();
    console.log("Full data:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

getSwagger();
