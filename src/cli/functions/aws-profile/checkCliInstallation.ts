import { Command } from "@tauri-apps/api/shell";

export async function checkCliInstallation() {
    try {
        const command = new Command('aws-cli', ['--version']);
        const output = await command.execute();

        // Extract the version from the output
        const versionMatch = output.stdout.match(/aws-cli\/(\d+(\.\d+)+)/);
        if (versionMatch) {
            const awsCliVersion = versionMatch[1];
            console.log('AWS CLI Version:', awsCliVersion);

            // Compare the major version
            const [majorVersion] = awsCliVersion.split('.');
            if (parseInt(majorVersion) >= 2) {
                console.log('Valid CLI version.');
                return true;
            } else {
                console.error('Cli version is not valid.');
                return false;
            }
        } else {
            console.error('Failed to get CLI version.');
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return false;
    }
}
