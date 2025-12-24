const fs = require('fs');
const path = require('path');

try {
  const root = process.cwd();
  const files = fs.readdirSync(root, { withFileTypes: true })
    .map(dirent => ({ name: dirent.name, type: dirent.isDirectory() ? 'dir' : 'file' }))
    .slice(0, 200);
  console.log(JSON.stringify({ workspaceRoot: root, files }));
} catch (err) {
  console.error(JSON.stringify({ error: err.message }));
  process.exit(1);
}
