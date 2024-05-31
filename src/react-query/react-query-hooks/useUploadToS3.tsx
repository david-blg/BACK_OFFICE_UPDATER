import { uploadS3Files } from "@/cli/functions/s3/uploadS3Files";
import { useToast } from "@/components/ui/use-toast";
import { parseS3UploadProgress } from "@/helpers/parseS3UploadProgress";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";


type UploadFileDataProps = {
    filePath: string,
    objectS3Key: string,
    currentProfile: string
    onProgress?: (progress: string) => void
};

export const useUploadToS3 = () => {
    const { toast } = useToast()
    const [progress, setProgress] = useState<string[]>([]);

    const mutation = useMutation({
        mutationFn: async ({ currentProfile, filePath, objectS3Key, onProgress }: UploadFileDataProps) => {
            const response = await uploadS3Files(filePath, objectS3Key, currentProfile!, onProgress);

            if (!response) return;
            console.log('Response:', response)
            onProgress && onProgress(response);
            const progressInfo = parseS3UploadProgress(response);
            console.log('Progress Info:', progressInfo)
            setProgress((prev) => [...prev, ...progressInfo]);

            return response;
        },
        onSuccess: (data, variables) => {
            toast({
                title: (`Successfully uploaded to S3`),
                description: (`Successfully uploaded ${variables.filePath} to S3`),
            })
            console.log(`Successfully uploaded ${variables.filePath} to S3:`, data);
        },
        onError: (error, variables) => {
            toast({
                title: (`Error uploading to S3`),
                description: (`Error uploading ${variables.filePath} to S3 error: ${error}`),
            })
            console.error(`Error uploading ${variables.filePath}:`, error);
        },
    });

    const uploadToS3 = async (data: any) => {
        const onProgress = (progressInfo: string) => {
            setProgress((prev) => [...prev, progressInfo]);
        };

        return await mutation.mutateAsync({ ...data, onProgress });
    };

    return {
        uploadToS3,
        isLoading: mutation.isPending,
        progress,
        setProgress,
        isSuccess: mutation.isSuccess
    };
};
