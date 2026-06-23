import ghpages from 'gh-pages';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(__dirname, 'dist');
const tempDeployDir = path.resolve(__dirname, '.temp-deploy');

console.log('Starting custom deploy script...');

try {
  // 1. Clean temp deploy directory
  if (fs.existsSync(tempDeployDir)) {
    fs.rmSync(tempDeployDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDeployDir);
  console.log('Created temporary directory at:', tempDeployDir);

  // 2. Copy all files from root directory to tempDeployDir
  const rootFiles = fs.readdirSync(rootDir);
  rootFiles.forEach(file => {
    // Exclude special system folders and the react source folder itself
    if (['node_modules', '.git', 'lost-and-found', '.temp-deploy', '.github'].includes(file)) {
      return;
    }
    const srcPath = path.join(rootDir, file);
    const destPath = path.join(tempDeployDir, file);
    
    fs.cpSync(srcPath, destPath, { recursive: true });
  });
  console.log('Copied other experiments to temp directory.');

  // 3. Create lost-and-found subdirectory in the temp directory
  const destLostAndFound = path.join(tempDeployDir, 'lost-and-found');
  fs.mkdirSync(destLostAndFound);

  // 4. Copy the compiled React dist folder to temp_deploy/lost-and-found
  fs.cpSync(distDir, destLostAndFound, { recursive: true });
  console.log('Copied compiled React app to lost-and-found subfolder.');

  // 5. Deploy the temp directory to the gh-pages branch on GitHub
  console.log('Publishing to GitHub gh-pages branch...');
  ghpages.publish(tempDeployDir, {
    branch: 'gh-pages',
    repo: 'https://github.com/theanshukr/Semester2webdev.git'
  }, (err) => {
    if (err) {
      console.error('Error during deployment:', err);
      process.exit(1);
    } else {
      console.log('Successfully deployed both React app and other experiments to gh-pages branch!');
      
      // Clean up the temporary folder
      try {
        fs.rmSync(tempDeployDir, { recursive: true, force: true });
      } catch (cleanupErr) {
        // Ignore cleanup errors
      }
      process.exit(0);
    }
  });
} catch (err) {
  console.error('Failed to run custom deploy:', err);
  process.exit(1);
}
