import { useEffect } from 'react';
import { useUserSessionStore } from '@/store/useSessionStore';
import { checkCliInstallation } from '@/cli/functions/aws-profile/checkCliInstallation';
import { getAllAWSProfiles } from '@/cli/functions/aws-profile/getAllProfiles';
import { doesStackExist } from '@/cli/functions/stack-data/doesStackExist';

function useAWSSession() {
    const { setSessionData, getSessionData } = useUserSessionStore();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const cliInstalled = await checkCliInstallation();
                console.log("CLI installed:", cliInstalled);
                const fetchedProfiles = await getAllAWSProfiles();
                const profilesArray = Array.isArray(fetchedProfiles) ? fetchedProfiles : fetchedProfiles ? [fetchedProfiles] : [];

                const storedStack = getSessionData().currentStack;
                // console.log("Stored stack:", storedStack)

                let updatedStack = storedStack;
                if (storedStack && getSessionData().currentProfile !== null && getSessionData().currentAwsRegion) {
                    const stackExists = await doesStackExist(storedStack, getSessionData().currentAwsRegion, getSessionData().currentProfile!);
                    // console.log("Stack exists:", stackExists)
                    if (!stackExists) {
                        updatedStack = null;
                    }
                }

                // console.log("Updated stack:", updatedStack)

                const currentProfile = getSessionData().currentProfile;
                
                const sessionData = {
                    // currentProfile: getSessionData().currentProfile || profilesArray[0] || null,
                    currentProfile: currentProfile && profilesArray.includes(currentProfile) ? currentProfile : profilesArray[0] || null,
                    profiles: profilesArray,
                    currentAwsRegion: getSessionData().currentAwsRegion || "us-east-1",
                    currentStack: updatedStack,
                    isCliInstalled: cliInstalled
                };

                // create simulation fake session data with no values for testing
                // const sessionData = {
                //     currentProfile: null,
                //     profiles: [],
                //     currentAwsRegion: "us-east-1",
                //     currentStack: null,
                //     isCliInstalled: cliInstalled
                // };


                // console.log("Session data:", sessionData)

                setSessionData(sessionData);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };

        fetchData();
    }, [setSessionData, getSessionData]);

    return getSessionData();
}

export default useAWSSession;
