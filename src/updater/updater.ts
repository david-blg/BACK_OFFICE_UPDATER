import { checkUpdate, installUpdate, onUpdaterEvent } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process'

export const handleUpdates = async () => {
    const unlisten = await onUpdaterEvent(({ error, status }) => {
        console.log('Updater event', error, status);
    });

    try {
        const { shouldUpdate, manifest } = await checkUpdate();

        console.log('Checking for updates', shouldUpdate, manifest);

        if (shouldUpdate) {
            console.log(
                `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
            );
            await installUpdate();
            await relaunch();
        }
    } catch (error) {
        console.error(error);
    }

    return unlisten;
};
