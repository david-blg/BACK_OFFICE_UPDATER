


export const parseS3UploadProgress = (resultString: string) => {
    const lines = resultString.split("\n"); // Divide la salida en líneas
    const progressInfo = [] as any;

    if (lines) {

        lines.forEach((line) => {
            if (line.includes("Completed")) {
                progressInfo.push(line); // Captura las líneas que indican progreso
            }
        });
    }

    return progressInfo; // Devuelve solo las líneas que muestran el progreso
};
