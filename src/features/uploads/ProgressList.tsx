import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
// import { Progress } from "@/components/ui/progress";
// import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import SpinnerButton from "@/components/custom/spinners/SpinnerButton";
// import { Check } from "lucide-react";

// Tipo para la agrupación del progreso por archivo
// type GroupedProgress = Record<string, string[]>;

// Componente para mostrar el estado del progreso
const ProgressStatus = ({ isComplete }: { isComplete: boolean }) => {
    return isComplete ? (
        <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <span className="text-sm">Upload Complete</span>
        </div>
    ) : (
        <div>
            <SpinnerButton />
        </div>
    );
};

// Componente para mostrar el detalle del progreso de un archivo
const FileProgressDetail = ({ linesProgress }: { linesProgress: string[] }) => {
    const [progressPercentage, setProgressPercentage] = useState(0);

    // Cálculo del porcentaje de progreso
    useEffect(() => {
        const completedPattern = /Completed (\d+.\d+) KiB\/(\d+.\d+) MiB/;
        const lastLine = linesProgress[linesProgress.length - 1];
        const match = lastLine.match(completedPattern);

        if (match) {
            const completedKiB = parseFloat(match[1]);
            const totalMiB = parseFloat(match[2]);
            const totalKiB = totalMiB * 1024;
            const percentage = Math.min((completedKiB / totalKiB) * 100, 100);

            setProgressPercentage(percentage);
        }
    }, [linesProgress]);

    return (
        <div className="p-2 space-y-2">
            {/* <Progress value={progressPercentage} /> Mostrar la barra de progreso */}
            <h2 className="text-sm font-semibold">Process Detail{progressPercentage}</h2>
            {linesProgress.map((line, index) => (
                <p key={index} className="text-xs text-muted-foreground">
                    {line}
                </p>
            ))}
        </div>
    );
};


// const ProgressList = ({ progress }: { progress: string[] }) => {
//     const groupedProgress = groupProgressByFile(progress);

//     return (
//         <Card className="p-4">
//             {Object.keys(groupedProgress).map((fileName) => {
//                 const fileProgress = groupedProgress[fileName];
//                 const isUploadComplete = fileProgress.some(
//                     (line) => line.includes("upload:") && line.includes("s3://")
//                 );

//                 return (
//                     <div key={fileName}>
//                         <CardHeader className="p-4">
//                             <CardTitle className="text-sm font-semibold">Uploading File...</CardTitle>
//                             <span className="text-xs text-muted-foreground">{fileName}</span>
//                         </CardHeader>
//                         <CardContent className="p-2 pt-0">
//                             <FileProgressDetail lines={fileProgress} />
//                             {isUploadComplete ? (
//                                 <>
//                                     <ProgressStatus isComplete={isUploadComplete} />
//                                     <Separator className="mt-2 " />
//                                 </>
//                             ) : <Separator />}

//                         </CardContent>
//                     </div>
//                 );
//             })}
//         </Card>
//     );
// };

// Función para agrupar el progreso por archivo
// const groupProgressByFile = (progress: string[]): GroupedProgress => {
//     const groupedProgress: GroupedProgress = {};

//     progress.forEach((line) => {
//         const filePattern = /s3:\/\/[^ ]+/;
//         const fileMatch = line.match(filePattern);

//         if (fileMatch) {
//             const fileName = fileMatch[0];
//             if (!groupedProgress[fileName]) {
//                 groupedProgress[fileName] = [];
//             }
//             groupedProgress[fileName].push(line);
//         }
//     });

//     return groupedProgress;
// };

// export default ProgressList;



const ProgressList = ({ progress }: { progress: any }) => {
    console.log('Progress:', progress);
    return (
        <Card className="p-4">
            {Object.entries(progress).map((step, upload) => (
                <div key={step[0]} className="text-muted-foreground text-sm mt-2">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                            {step.map((line: any, index: number) => (
                                <>
                                    {line.includes('upload:') && line.includes('s3://') ? (
                                        <ProgressStatus isComplete={true} />
                                    ) : (
                                        <ProgressStatus isComplete={false} />
                                    )}
                                    <p key={index} className="text-xs text-muted-foreground">
                                        {line}{upload}
                                    </p>
                                </>
                            ))}
                        </div>
                        <FileProgressDetail linesProgress={progress} />
                    </div>

                </div>
            ))}
        </Card>
    );
};

export default ProgressList;