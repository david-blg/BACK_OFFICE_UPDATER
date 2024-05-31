export const stackQueries = {
    // bucketNameQueryKey: (currentStack: string, currentAwsRegion: string, currentProfile: string) => ['bucket-name-by-stack', currentStack, currentAwsRegion, currentProfile],
    stacksQueryKey: ( currentAwsRegion: string, currentProfile: string) => ['stacks', currentAwsRegion, currentProfile],
};