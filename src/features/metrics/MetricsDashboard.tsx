import { historicalData } from "../dashboard/data/dataCard";
import { useNavigate } from "react-router-dom";
import LineChartDasboard from "./LineChartDasboard";
import PieChartDashboard from "./PieChartDashboard";

const MetricsDashboard = () => {

    const navigate = useNavigate()

    // Convierte las fechas para el LineChart
    const chartData = historicalData.map((weekData) => ({
        ...weekData,
        week: new Date(weekData.week).toLocaleDateString(), // Convierte la fecha a un formato legible
    }));


    const totalDownloads = historicalData.reduce((sum, weekData) => sum + weekData.total, 0);

    // Obtiene los datos para el último registro
    const latestData = historicalData[historicalData.length - 1];

    const colorMapping = {
        windows: "#0ea5e9", // Color para Windows
        linux: "#f97316",   // Color para Linux
        macos: "#94a3b8",   // Color para MacOS
        total: "#22c55e",   // Color para Total de descargas
    };


    // Datos para el PieChart (uso de claves "name" y "value")
    const pieChartData = [
        { name: "Windows", value: latestData.windows, color: colorMapping.windows },
        { name: "Linux", value: latestData.linux, color: colorMapping.linux },
        { name: "MacOS", value: latestData.macos, color: colorMapping.macos },
        { name: "Total Downloads", value: latestData.total, color: colorMapping.total }
    ];

    // Colores para las secciones del PieChart
    const colors = pieChartData.map((data) => data.color);



    const handleRedirect = (path: string) => {
        navigate(path)
    }

    const nameMapping = {
        windows: "Windows",
        linux: "Linux",
        macos: "MacOS",
        total: "Total Downloads",
    };


    const totalPieChartValue = pieChartData.reduce((acc, data) => acc + data.value, 0);

    const pieChartDataWithPercent = pieChartData.map((item) => ({
        ...item,
        percent: ((item.value / totalPieChartValue) * 100).toFixed(2), // Redondear el porcentaje a 2 decimales
    }));

    const previousWeekData = historicalData[historicalData.length - 2];
    const totalPreviousWeek =
        (previousWeekData ? previousWeekData.windows : 0) +
        (previousWeekData ? previousWeekData.linux : 0) +
        (previousWeekData ? previousWeekData.macos : 0) +
        (previousWeekData ? previousWeekData.total : 0);

    const difference = totalPieChartValue - totalPreviousWeek;
    const trend = difference > 0 ? "up" : "down";
    const percentChange = totalPreviousWeek !== 0
        ? (difference / totalPreviousWeek) * 100
        : 0;


    return (
        <div className="grid grid-cols-4 gap-2 w-full">
            <LineChartDasboard
                chartData={chartData}
                redirectPath="/metrics"
                handleRedirect={handleRedirect}
                totalDownloads={totalDownloads}
                colors={colorMapping}
                nameMapping={nameMapping}
            />

            <PieChartDashboard
                pieChartData={pieChartDataWithPercent}
                redirectPath="/metrics"
                handleRedirect={handleRedirect}
                colors={colors}
                percentChange={percentChange}
                trend={trend}
                totalPieChartValue={totalPieChartValue}

            />
        </div>
    );
};

export default MetricsDashboard;
