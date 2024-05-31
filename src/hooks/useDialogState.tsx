import { useState, useEffect } from "react";
import { useSelectedFilesStore } from "@/store/UseSelectedFilesStore";

export const useDialogState = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { selectedFiles } = useSelectedFilesStore();

    useEffect(() => {
        if (selectedFiles.length > 0) {
            setIsDialogOpen(true);
        } else {
            setIsDialogOpen(false);
        }
    }, [selectedFiles]);

    return { isDialogOpen, setIsDialogOpen };
};
