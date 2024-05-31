import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { classifyByOS } from "@/features/uploads/uploads-utils/uploadUtils";
import { Loader2, } from "lucide-react";
import ProgressList from "./ProgressList";
import FileGroupCard from "./FIleGroupCard";

interface DialogConfirmFileProps {
    isOpen: boolean;
    isSubmitting: boolean;
    onClose: () => void;
    selectedFiles: string[];
    handleUploadToS3: (files: string[]) => void;
    clearSelectedFiles: () => void;
    isLoading: boolean;
    progress: any
}

const DialogConfirmFile = ({
    isOpen,
    onClose,
    selectedFiles,
    handleUploadToS3,
    // clearSelectedFiles,
    isSubmitting,
    isLoading,
    progress
}: DialogConfirmFileProps) => {

    const UploadingFilesLoading = () => {
        return (
            <>
                <Loader2 size={16} className="animate-spin" />
                <span className="ml-2">Uploading files...</span>
            </>
        )
    }

    const groupedFiles = classifyByOS(selectedFiles);


    const handleUpload = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('Selected Files:', selectedFiles)
        handleUploadToS3(selectedFiles);
    };



    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[1000px]">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle>Review Releases & Confirm</DialogTitle>
                    <DialogDescription>
                        Please review the files before uploading to S3.
                    </DialogDescription>
                    <DialogTitle className="pt-6">
                        {progress && progress.length > 0 ? "" : "Installers"}
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="w-full p-4 pt-0 max-h-[300px]">
                    {isLoading ? (
                        <>
                            {progress && progress.length > 0 && (
                                <ProgressList progress={progress} />
                            )}
                        </>
                    ) : (
                        <>
                            {Object.keys(groupedFiles).map((os) => (
                                <FileGroupCard
                                    key={os}
                                    osName={os}
                                    groupedFiles={groupedFiles[os]}
                                />
                            ))}
                        </>
                    )}
                </ScrollArea>
                <DialogFooter className="">
                    <DialogClose asChild>
                        <Button variant="secondary" size='md' onClick={onClose}>Cancel</Button>
                    </DialogClose>
                    <Button type="button" size='md' onClick={handleUpload} disabled={isLoading && isSubmitting}>
                        {isLoading && isSubmitting ? (
                            <UploadingFilesLoading />
                        ) : (
                            <>
                                Confirm & Upload
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogConfirmFile;
