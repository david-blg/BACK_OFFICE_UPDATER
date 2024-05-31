import { DownloadCloudIcon } from "lucide-react";
import { SiApple, SiArchlinux, SiWindows10 } from "react-icons/si";

// Datos de descargas actuales
export const dataCard = [
    {
        icon: <DownloadCloudIcon size={36} />,
        title: "Total Downloads",
        totalDownloads: 72 // Número en lugar de cadena
    },
    {
        icon: <SiWindows10 size={36} />,
        title: "Windows Downloads",
        totalDownloads: 5
    },
    {
        icon: <SiArchlinux size={36} />,
        title: "Linux Downloads",
        totalDownloads: 65
    },
    {
        icon: <SiApple size={36} />,
        title: "MacOS Downloads",
        totalDownloads: 2
    }
];

// Datos históricos (semanas anteriores)
export const historicalData = [
    {
        week: "2023-03-25",
        windows: 40,
        linux: 10,
        macos: 25,
        total: 75
    },
    {
        week: "2023-04-08",
        windows: 25,
        linux: 20,
        macos: 10,
        total: 55
    },
    {
        week: "2023-04-15",
        windows: 20,
        linux: 15,
        macos: 5,
        total: 40
    },
    {
        week: "2023-04-22",
        windows: 5,
        linux: 65,
        macos: 2,
        total: 72
    },
    {
        week: "2023-04-29",
        windows: 10,
        linux: 50,
        macos: 5,
        total: 65
    },
    {
        week: "2023-05-06",
        windows: 5,
        linux: 40,
        macos: 5,
        total: 50
    }
];
