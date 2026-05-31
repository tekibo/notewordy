import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const legacyDir = join(__dirname, 'legacy');

function extractMappings(filePath) {
  // Read as UTF-8
  const content = readFileSync(filePath, 'utf-8');
  const mappings = [];
  
  // Match: x = x.replace(/<pattern>/<flags>, "<replacement>")
  // or with single quotes
  // The pattern can contain any characters except unescaped /
  const regex = /x\s*=\s*x\.replace\(\/((?:[^\n\r\/]|\\.)*)\/([gimsuy]*)\s*,\s*((['"])(?:\\.|(?!\4).)*\4)\s*\)/g;
  
  let match;
  while ((match = regex.exec(content)) !== null) {
    const from = match[1];
    const flags = match[2] || 'g';
    const toRaw = match[3];
    const to = toRaw.slice(1, -1); // Remove surrounding quotes
    mappings.push({ from, to, flags });
  }
  
  return mappings;
}

const files = ['lachit_geet_uni.js', 'lachit_uni_geet.js', 'lachit_sanitiser.js'];
const allMappings = {};

for (const file of files) {
  const path = join(legacyDir, file);
  const name = file.replace('.js', '');
  allMappings[name] = extractMappings(path);
  console.log(`${file}: ${allMappings[name].length} mappings`);
}

// Ensure src directory exists
mkdirSync(join(__dirname, 'src'), { recursive: true });

// Write as TypeScript with lazy initialization
let ts = `// Auto-generated from legacy lachit-main JS files
// Do not edit manually - run gen.mjs to regenerate

export interface ReplaceMapping {
  from: string;
  to: string;
  flags: string;
}

`;

for (const [name, mappings] of Object.entries(allMappings)) {
  ts += `const _${name} = ${JSON.stringify(mappings)};\nexport const ${name}: ReplaceMapping[] = _${name};\n\n`;
}

ts += `
export function applyMappings(text: string, mappings: ReplaceMapping[]): string {
  let result = text;
  for (const { from, to, flags } of mappings) {
    result = result.replace(new RegExp(from, flags), to);
  }
  return result;
}
`;

writeFileSync(join(__dirname, 'src', 'mappings.ts'), ts, 'utf-8');
console.log('Generated src/mappings.ts');
