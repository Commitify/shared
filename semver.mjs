import { readFileSync, writeFileSync } from 'fs';
import semver from 'semver';

// Function to increment version
function incrementVersion(version, releaseType) {
    switch (releaseType) {
        case 'major':
            return semver.inc(version, 'major');
        case 'minor':
            return semver.inc(version, 'minor');
        case 'patch':
            return semver.inc(version, 'patch');
        default:
            throw new Error('Invalid release type. Use "major", "minor", or "patch".');
    }
}

// Main function to read, update and write package.json
function updatePackageVersion(releaseType) {
    try {
        // Read package.json
        const packageJsonPath = './package.json';
        const packageJsonData = readFileSync(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(packageJsonData);

        // Increment version
        const currentVersion = packageJson.version;
        const newVersion = incrementVersion(currentVersion, releaseType);

        // Update package.json with new version
        packageJson.version = newVersion;
        writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log(`Version updated from ${currentVersion} to ${newVersion}`);
    } catch (error) {
        console.error('Error updating package version:', error.message);
    }
}

// Get the release type from command line arguments
const releaseType = process.argv[2];
if (!releaseType) {
    console.error('Please specify a release type: major, minor, or patch');
    process.exit(1);
}

// Update the package version
updatePackageVersion(releaseType);
