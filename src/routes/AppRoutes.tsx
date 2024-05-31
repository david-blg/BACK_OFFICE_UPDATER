import CostExplorerPage from "@/pages/CostExplorerPage"
import DashboardPage from "@/pages/DashboardPage"
import DownloadPage from "@/pages/DownloadPage"
import MetricsPage from "@/pages/MetricsPage"
// import NotFoundPage from "@/pages/NotFoundPage"
import SettingsPage from "@/pages/SettingsPage"
import StackPage from "@/pages/StackPage"
import UploadPage from "@/pages/UploadPage"
import { Route, Routes } from "react-router-dom"

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/downloads" element={<DownloadPage />} />
                <Route path="/uploads" element={<UploadPage />} />
                <Route path="/metrics" element={<MetricsPage />} />
                <Route path="/stack" element={<StackPage />} />
                <Route path="/cost-explorer" element={<CostExplorerPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
        </>
    )
}

export default AppRoutes