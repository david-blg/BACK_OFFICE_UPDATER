import CardDownloads from "./CardDownloads";
import { dataCard, historicalData } from "./data/dataCard";

function calculateTrend(historicalData: any, dataCard: any) {
    // Calcula la tendencia para cada sistema operativo y total
    return dataCard.map((card: any) => {
        const previousWeek = historicalData[historicalData.length - 1];
        const current = card.totalDownloads;
        const previous = previousWeek[card.title.split(' ')[0].toLowerCase()];

        const diff = current - previous;

        // Evitar divisiones por cero
        // Si no hay descargas anteriores, el cambio porcentual es 0
        const percentChange = previous !== 0 ? (diff / previous) * 100 : 0;

        return {
            ...card,
            trend: diff > 0 ? "up" : "down",
            percentChange: percentChange.toFixed(1) // Redondear a un decimal
        };
    });
}

interface TrendData {
    icon: JSX.Element,
    title: string,
    totalDownloads: number,
    trend: string,
    percentChange: number
}

export const trendData = calculateTrend(historicalData, dataCard);

const CountDownloads = () => {

   

    return (
        <>
            <div className="flex flex-col gap-1 justify-center pt-8 pb-4 w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
                    {
                        trendData.map(({ icon, title, totalDownloads, trend, percentChange }: TrendData, index: number) => (
                            <CardDownloads
                                key={index}
                                icon={icon}
                                title={title}
                                totalDownloads={totalDownloads}
                                trendData={{ trend, percentChange: percentChange.toString() }}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CountDownloads