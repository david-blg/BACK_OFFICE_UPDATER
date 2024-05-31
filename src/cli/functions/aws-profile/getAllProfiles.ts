import { cleanOutput, handleCommandClose, handleCommandError } from "@/cli/cli-utils/commandOutput";
import { Command } from "@tauri-apps/api/shell";


export async function getAllAWSProfiles(): Promise<string[] | string | undefined> {
    try {
        const awsCliCommand = new Command('aws-cli', ["configure", "list-profiles", "--output", "json"]);

        // console.log('Executing command: ');
        awsCliCommand.on('close', (data) => {
            handleCommandClose(data);
        });

        awsCliCommand.on('error', (error) => {
            handleCommandError(error);
        });

        const childProcess = await awsCliCommand.execute();
        // console.log(childProcess.stdout?.toString() || '');

        const childOutput = childProcess.stdout?.toString() || '';
        const cleanedOutput = cleanOutput(childOutput);

        const profiles = cleanedOutput.trim().split('\n');

        return profiles;
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}

