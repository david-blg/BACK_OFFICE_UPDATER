import { Select, SelectContent, SelectGroup, SelectItem, SelectTriggerFooter, SelectValueFooter } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query";
import SpinnerFooter from "../spinners/SpinnerFooter";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserSessionStore } from "@/store/useSessionStore";
import { stackQueries } from "@/react-query/utils/queryKeyStore";
import { getStacksByRegion } from "@/cli/functions/stack-data/getStacksByRegion";
import { toast } from "@/components/ui/use-toast";

interface Item {
    StackName: string;
    StackStatus: string;
}


const StackSelect = () => {
    // const profile = localStorage.getItem('aws-profile');
    // const { currentAwsRegion, currentStack, setCurrentStack } = useUserSessionStore()
    const { getSessionData, setSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { currentProfile, currentAwsRegion, currentStack } = sessionData;

    const navigate = useNavigate()
    const currentPathname = useLocation().pathname

    const { data, isLoading, isError, error } = useQuery({
        queryKey: stackQueries.stacksQueryKey(currentAwsRegion, currentProfile!),
        // queryFn: () => getStacksByRegion(currentAwsRegion, currentProfile),
        queryFn: () => {
            if (currentAwsRegion && currentProfile) {
                return getStacksByRegion(currentAwsRegion, currentProfile);
            }
        },
        retry: 1,
        enabled: currentAwsRegion !== null && currentProfile !== null,
    });

    // console.log('data', data)

    const handleStackChange = (value: string) => {
        console.log('value', value)
        const selectedStack = value;
        // setCurrentStack(selectedStack);
        setSessionData({ ...sessionData, currentStack: selectedStack });
        if (currentPathname.split('/')[1] === 'renders') {
            navigate(`/renders`)
        }
    }


    if (isError) {
        toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
        })
    }


    return (
        <>
            <Select defaultValue={currentStack || undefined} onValueChange={handleStackChange} value={currentStack!}>
                <SelectTriggerFooter className="flex items-center" disabled={isLoading || data?.length === 0 || !data || isError }>
                    {isLoading ? <SpinnerFooter /> : <SelectValueFooter placeholder={currentStack} defaultValue={currentStack!} />}
                    {isError ? <p>Error loading stacks</p> : null}
                    {data?.length === 0 ? <p>No stacks found</p> : null}
                    {!isLoading && !currentStack && !isError && data?.length !== 0 && <p>Select a stack</p>}
                </SelectTriggerFooter>
                <SelectContent className="z-[120]">
                    {isError ? (
                        <SelectGroup>
                            <SelectItem className="text-start px-2" value="error" disabled>
                                Error loading stacks
                            </SelectItem>
                        </SelectGroup>
                    ) : data?.length === 0 ? (
                        <SelectGroup>
                            <p className="text-center text-xs text-muted-foreground">
                                No stacks found
                            </p>
                        </SelectGroup>
                    ) : (
                        <SelectGroup>
                            {data?.map((item: Item, index: number) => (
                                <SelectItem
                                    // defaultValue={currentStack === null ? item.StackName : currentStack}
                                    defaultChecked={item.StackName === currentStack}
                                    key={index}
                                    disabled={item.StackStatus !== 'CREATE_COMPLETE'}
                                    value={item.StackName.toString() || "unassigned"}
                                    onClick={() => handleStackChange(item.StackName)}
                                    className={currentStack === item.StackName ? 'bg-accent' : ''}
                                >
                                    {item.StackName.toLocaleUpperCase()}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    )}
                </SelectContent>
            </Select>
        </>
    )
}

export default StackSelect