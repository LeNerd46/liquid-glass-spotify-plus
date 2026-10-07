import { spawnSync } from 'node:child_process';
import { copyFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const native = path.join(root, 'native');
function gradle(directory, args) {
    const command = path.join(directory, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');
    const result = spawnSync(command, args, { cwd: directory, stdio: 'inherit', shell: process.platform === 'win32' });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`Native build failed (${result.status})`);
}
// This standalone project keeps a matching public SDK AAR locally.
const bundledSdk = path.join(native, 'lib/spotifyplus-sdk.aar');
const sdk = process.env.SPOTIFYPLUS_SDK_AAR || bundledSdk;
await access(sdk);
await mkdir(path.join(native, 'lib'), { recursive: true });
if (path.resolve(sdk) !== path.resolve(bundledSdk)) {
    await copyFile(sdk, bundledSdk);
}
gradle(native, [':app:assembleRelease']);
await copyFile(path.join(native, 'app/build/outputs/apk/release/app-release-unsigned.apk'), path.join(root, 'liquid-glass.apk'));
