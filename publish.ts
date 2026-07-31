import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

interface Compatibility {
  minimum: string;
  verified: string;
  maximum: string;
}

interface Manifest {
  compatibility: Compatibility;
  id: string;
}

async function readCompatibilityInfo(filePath: string): Promise<Compatibility> {
  const data = fs.readFileSync(filePath, 'utf-8');
  const manifest: Manifest = JSON.parse(data);
  return manifest.compatibility;
}

async function readModuleId(filePath: string): Promise<string> {
  const data = fs.readFileSync(filePath, 'utf-8');
  const manifest: Manifest = JSON.parse(data);
  return manifest.id;
}

// A package is either a `system` or a `module`. The kind is deduced from which
// manifest sits in `src/`, so nothing has to be configured to publish a module -
// KIND_OF_PROJECT stays available as an explicit override.
// `||` rather than `??`: CI hands over an empty string when the repository
// variable is unset, and that must fall through to auto-detection.
const kindOfProject =
  process.env.KIND_OF_PROJECT ||
  (fs.existsSync(path.resolve(__dirname, 'src', 'module.json')) ? 'module' : 'system');

async function updateReleaseVersion(githubUrl: string, version: string, authToken:string) {
  const manifestPath = path.resolve(__dirname, 'src', `${kindOfProject}.json`);
  const compatibilityInfo = await readCompatibilityInfo(manifestPath);
  const moduleId = await readModuleId(manifestPath);
  try {
    const response = await axios.post(
      'https://api.foundryvtt.com/_api/packages/release_version/',
      {
        id: moduleId,
        release: {
          version: version,
          manifest: `${githubUrl}/releases/download/v${version}/${kindOfProject}.json`,
          notes: `${githubUrl}/releases/tag/${version}`,
          compatibility: {
            minimum: compatibilityInfo.minimum,
            verified: compatibilityInfo.verified,
            maximum: compatibilityInfo.maximum
          }
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error('Error updating release version:', error);
    process.exit(1);
  }
}

updateReleaseVersion(
  process.env.RELEASE_GITHUB_URL ?? "", 
  process.env.RELEASE_VERSION ?? "",
  process.env.RELEASE_AUTH_TOKEN ?? ""
);