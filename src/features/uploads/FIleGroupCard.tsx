
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatOSName, organizeFiles } from './uploads-utils/uploadUtils';

const FileGroupCard = ({ osName, groupedFiles }: any) => {
    return (
        <Card className="p-4 mt-4">
            <CardHeader className="p-4 pb-0">
                <div className="flex justify-between">
                    <span className="text-sm font-semibold">{formatOSName(osName)}</span>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                {Object.keys(groupedFiles).map((version) => (
                    <div key={version}>
                        <div className="flex items-center gap-2 mb-1 mt-1">
                            <span className="text-xs font-semibold">Version</span>
                            <span className="text-xs font-semibold">
                                {version}: <span className="text-xs text-muted-foreground">
                                    {groupedFiles[version].length} files
                                </span>
                            </span>
                        </div>
                        <div>
                            {groupedFiles[version].map((file: string, index: number) => {
                                const { objectS3Key } = organizeFiles(file);
                                return (
                                    <div key={index}>
                                        <p className="text-xs text-muted-foreground">{file}</p>
                                        <span className="text-xs text-muted-foreground mb-1">
                                            <span className="font-semibold text-primary">S3 Key: </span>
                                            {objectS3Key}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default FileGroupCard;
