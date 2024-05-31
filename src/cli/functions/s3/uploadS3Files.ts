import { Command } from "@tauri-apps/api/shell";


export const uploadS3Files = async (
    filePath: string,
    objectS3Key: string,
    currentProfile: string,
    onProgress?: (progress: string) => void
) => {

    console.log("Uploading file to:", objectS3Key);
    if(onProgress){
        onProgress("Preparing files to upload...")
    }

    const bucketName = "brender-studio-tauri-updater-v2";
    // const bucketName = "brender-studio-bucket-v2";

    try {
        const command = new Command('aws-cli', [
            "s3",
            "cp",
            filePath,
            `s3://${bucketName}/${objectS3Key}`,
            '--profile', currentProfile,
        ]);

        console.log("Uploading file to S3...", command);

        // command.stdout.on("data", (data) => {
        //     if (onProgress) {
        //         onProgress(data.toString());
        //     }
        // });

        try {
            const result = await command.execute();
            console.log('result:', result);

            const resultString = result.stdout.toString();
            if(onProgress){
                onProgress(resultString)
            }
            return resultString;
        } catch (error) {
            console.error(error);
            throw new Error(`Command failed with error: ${error}`);
        }

    } catch (error) {
        if (error instanceof Error) {
            console.error('Failed to execute command: ', error.message);
            return error.message;
        }
    }
}

