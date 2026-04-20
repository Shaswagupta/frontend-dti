const fs = require('fs');
const path = require('path');

const dir = '/Users/shaswatgupta/Downloads/frontend-dti/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/text-white/g, 'text-on-surface');
  content = content.replace(/border-white\/5/g, 'border-outline-variant/20');
  content = content.replace(/border-white\/10/g, 'border-outline-variant/30');
  content = content.replace(/bg-black(?!\/)/g, 'bg-background');
  content = content.replace(/bg-black\/80/g, 'bg-background/80');
  content = content.replace(/text-black/g, 'text-background');
  content = content.replace(/bg-\[\#121212\]/g, 'bg-background');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
}
