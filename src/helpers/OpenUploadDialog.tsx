import { open } from "@tauri-apps/api/dialog";

export const openUploadDialog = async () => {
    return await open({
        directory: false,
        multiple: true,
        title: "Select a bin file to upload",
    });
}
