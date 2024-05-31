import PieChartLegend from "@/components/custom/legends/PieChartLegend";
import TooltipPieChart from "@/components/custom/tooltips/TooltipPIeChart";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"


interface PieChartDashboardProps {
    redirectPath: string
    handleRedirect: (redirectPath: string) => void;
    pieChartData: any
    colors: string[]
    totalPieChartValue: any
    trend: any
    percentChange: any
}


const PieChartDashboard = ({ colors, handleRedirect, pieChartData, redirectPath, totalPieChartValue, trend, percentChange }: PieChartDashboardProps) => {


    const isTrendUp = trend === "up";
    const trendColor = isTrendUp ? "text-green-400 text-sm" : "text-red-400 text-sm";
    const TrendIcon = isTrendUp ? TrendingUp : TrendingDown;

    return (
        <Card className="col-span-1 h-full rounded-xl cursor-pointer hover:border-white/25"
            onClick={() => handleRedirect(redirectPath)}
        >
            <CardHeader className="p-5">OS Distribution</CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <PieChart
                    >
                        <Pie
                            data={pieChartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={50} // Radio interno (para donut chart)
                            outerRadius={80} // Radio externo
                            fill="#8884d8"
                            label
                        >
                            {pieChartData.map((entry: { name: string | undefined; }, index: number) => (
                                <Cell key={`cell-${index}`} fill={colors[index]} name={entry.name} stroke={colors[index]} />
                            ))}
                        </Pie>
                        <Legend verticalAlign="bottom" align="left" content={<PieChartLegend />} />
                        <Tooltip content={<TooltipPieChart />} />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex flex-col items-start  p-5">
                <div>
                    <span className="text-sm ">Total Cumulative Downloads: </span>
                    <span className="text-sm text-muted-foreground">{totalPieChartValue}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm">Percentage Change: </span>
                    <TrendIcon className={trendColor} size={18} />
                    <span className={`text-sm ${trendColor}`}>{percentChange.toFixed(2)}%</span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default PieChartDashboard