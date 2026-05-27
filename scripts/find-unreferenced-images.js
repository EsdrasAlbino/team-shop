// scripts/find-unreferenced-images.js
const fs = require('fs').promises;
const path = require('path');

const PRODUCTS_JSON = path.join(__dirname, '..', 'data', 'products.json');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'camisa');
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

async function main() {
  const prodRaw = await fs.readFile(PRODUCTS_JSON, 'utf8');
  const products = JSON.parse(prodRaw);

  const referenced = new Set();
  for (const p of products) {
    if (!p || !p.imagem_url) continue;
    for (const url of p.imagem_url) {
      const name = path.basename(url);
      if (name) referenced.add(name.toLowerCase());
    }
  }

  const files = await fs.readdir(IMAGES_DIR);
  const images = files.filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()));

  const unreferenced = images.filter(f => !referenced.has(f.toLowerCase()));

  if (unreferenced.length === 0) {
    console.log('Nenhuma imagem não referenciada encontrada.');
    return;
  }

  console.log('Imagens em public/camisa NÃO referenciadas em data/products.json:');
  for (const f of unreferenced) {
    console.log('-', f);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});