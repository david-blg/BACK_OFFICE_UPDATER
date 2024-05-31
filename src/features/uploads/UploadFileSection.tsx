import CardUploadFile from "@/components/custom/cards/CardUploadFile";
import DialogConfirmFile from "@/features/uploads/DialogConfirmFile";
import { openUploadDialog } from "@/helpers/OpenUploadDialog";
import { useSelectedFilesStore } from "@/store/UseSelectedFilesStore";
import { useDialogState } from "@/hooks/useDialogState";
import { organizeFiles } from "./uploads-utils/uploadUtils";
import useAWSSession from "@/hooks/useAWSSession";
import { useToast } from "@/components/ui/use-toast";
import { useUploadToS3 } from "@/react-query/react-query-hooks/useUploadToS3";
import { useState } from "react";


const UploadFileSection = () => {
    const { selectedFiles, setSelectedFiles, clearSelectedFiles } = useSelectedFilesStore();
    const { currentProfile } = useAWSSession();
    const { isDialogOpen, setIsDialogOpen } = useDialogState();
    const { toast } = useToast();
    const { uploadToS3, isLoading, progress,setProgress, } = useUploadToS3();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const UPLOAD_PROGRESS = {
        PREPARING_FILES: "Preparing files to upload s3",
        UPLOADING_FILES: "Uploading files to s3",
        UPLOAD_COMPLETE: "Upload complete",
    };

    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: boolean }>({
        [UPLOAD_PROGRESS.PREPARING_FILES]: false,
        [UPLOAD_PROGRESS.UPLOADING_FILES]: false,
        [UPLOAD_PROGRESS.UPLOAD_COMPLETE]: false,
    });


    // TODO: Revisar logica de progreso para mostrar en tiempo real los logs del proceso.

    const progressCallback = (step: string) => {
        setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [step]: true,
        }));
    };



    const handleOpenDialog = async () => {
        try {
            const result = await openUploadDialog();
            if (!result) return;

            setSelectedFiles(Array.isArray(result) ? result : [result]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUploadToS3 = async (files: string[]) => {
        setIsSubmitting(true);

        progressCallback(UPLOAD_PROGRESS.PREPARING_FILES);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(' Progress Callback: ', uploadProgress)

        try {
            progressCallback(UPLOAD_PROGRESS.UPLOADING_FILES);
            // set time to prepare files to upload and update progress
            const uploadPromises = files.map(async (file) => {
                const { objectS3Key } = organizeFiles(file);
                try {
                    const result = await uploadToS3({
                        filePath: file,
                        objectS3Key,
                        currentProfile,
                        onProgress: {
                            progressCallback
                        },
                    });
                    console.log(`${file} uploaded to S3 with result:`, result);
                    if (result && result.length > 0) {
                        const responseMessages = result.split('\n').map((message: string, index) => (
                            <p key={index} className="text-xs text-muted-foreground font-normal">
                                {message}
                            </p>
                        ));
                        setProgress(responseMessages.map((message) => message.props.children.toString()));
                    }
                    return result;
                } catch (error) {
                    console.error(`Error uploading ${file}:`, error);
                    throw error;
                }
            });

            const results = await Promise.all(uploadPromises);

            if (results.length === files.length) {
                toast({
                    title: "Successfully uploaded to S3",
                    description: `Successfully uploaded ${files.length} files to S3`,
                });

                progressCallback(UPLOAD_PROGRESS.UPLOAD_COMPLETE);

                // Simular una pequeña pausa para mostrar el estado de finalización
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // setIsDialogOpen(false);
                clearSelectedFiles();
            } else {
                throw new Error("Some files failed to upload to S3");
            }
        } catch (error) {
            toast({
                title: "Error uploading to S3",
                description: `Error during S3 upload: ${error}`,
            });
            console.error("Error during S3 upload:", error);
        } finally {
            setIsSubmitting(false);
            clearSelectedFiles();
            setUploadProgress({
                preparing: false,
                uploading: false,
                completed: false,
            });
        }
    };


    return (
        <div className="py-8">
            <CardUploadFile onClick={handleOpenDialog} />

            {selectedFiles.length > 0 && (
                <DialogConfirmFile
                    isOpen={isDialogOpen}
                    selectedFiles={selectedFiles}
                    handleUploadToS3={handleUploadToS3}
                    clearSelectedFiles={clearSelectedFiles}
                    isSubmitting={isSubmitting}
                    progress={progress}
                    isLoading={isLoading}
                    onClose={() => {
                        setIsDialogOpen(false);
                        clearSelectedFiles();
                    }}
                />
            )}
        </div>
    );
};

export default UploadFileSection;
