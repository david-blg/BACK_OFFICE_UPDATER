import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardDownloadsProps {
    icon: JSX.Element;
    title: string;
    totalDownloads: number;
    trendData: {
        trend: string;
        percentChange: string;
    };
}

const CardDownloads = ({ icon, title, totalDownloads, trendData }: CardDownloadsProps) => {

    const isTrendUp = trendData.trend === "up";
    const trendColor = isTrendUp ? "text-green-400" : "text-red-400";
    const navigate = useNavigate()

    const handleNavigate = (path: string) => {
        navigate(path)
    }

    return (
        <Card className="min-h-[5rem] w-full rounded-xl  bg-card p-5 pr-0 gap-4 xl:items-start cursor-pointer hover:border-white/25"
            onClick={() => handleNavigate('/downloads')}
        >
            <div>
                <div className="flex items-center w-full">
                    <span className="text-xs text-muted-foreground truncate">
                        {title}
                    </span>
                </div>
                <div className="bg-right-top  flex items-center justify-between w-full pr-5">
                    <div className="mt-4 mb-4 pr-4 text-sm  text-pretty self-start">
                        <p className="text-lg ">{totalDownloads}</p>
                    </div>
                    <div className="h-10 w-full flex items-center justify-end">
                        {icon}
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full pt-4">
                    {isTrendUp ? (
                        <TrendingUp className={trendColor} />
                    ) : (
                        <TrendingDown className={trendColor} />
                    )}
                    <span className={`text-xs ${trendColor}`}>{Math.abs(parseFloat(trendData.percentChange))}%</span>
                    <p className="w-full text-xs text-muted-foreground truncate">
                        {isTrendUp ? "Up last past week" : "Down last past week"}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default CardDownloads