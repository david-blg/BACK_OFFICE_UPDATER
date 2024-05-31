import { CloudDownload, CreditCard, Hammer,  Layers2, LayoutDashboard, LineChart, Settings2, UploadCloud } from "lucide-react";

export const topRoutes = [
    {
        path: "/",
        name: "Dashboard",
        icon: <LayoutDashboard size={16} />,
        exact: true
    },
    {
        path: "/downloads",
        name: "Downloads",
        icon: <CloudDownload size={16} />,
        exact: true
    },
    {
        path: "/uploads",
        name: "Uploads",
        icon: <UploadCloud size={16} />,
        exact: true
    },
    {
        path: "/metrics",
        name: "Metrics",
        icon: <LineChart size={16} />,
        exact: true
    },
    {
        path: "/stack",
        name: "Stack",
        icon: <Layers2 size={16} />,
        exact: true
    },
    {
        path: "/builds",
        name: "Builds",
        icon: <Hammer size={16} />,
        exact: true
    },
];

export const bottomRoutes = [
    {
        path: "/cost-explorer",
        name: "Cost Explorer",
        icon: <CreditCard size={16} />,
        exact: true
    },
    {
        path: "/settings",
        name: "Settings",
        icon: <Settings2 size={16} />,
        exact: true
    },
    // {
    //     path: "/profile",
    //     name: "Profile",
    //     icon: <User size={16} />,
    //     exact: true
    // }
];
