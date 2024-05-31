import LineChartLegend from "@/components/custom/legends/LineChartLegend"
import TooltipMetricsDashboard from "@/components/custom/tooltips/TooltipMetricsDashboard"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


interface LineChartDashboardProps {
    redirectPath: string
    chartData: any
    handleRedirect: (redirectPath: string) => void;
    totalDownloads: number
    colors: any
    nameMapping: any
}


const LineChartDasboard = ({ chartData, redirectPath, handleRedirect, totalDownloads, colors, nameMapping }: LineChartDashboardProps) => {


    const averageDownloads = totalDownloads / 30

    return (
        <Card className="col-span-3 h-full p-6 rounded-xl w-full cursor-pointer hover:border-white/25"
            onClick={() => handleRedirect(redirectPath)}
        >
            <div className="p-5 flex justify-between">
                <CardHeader className="p-0">
                    Downloads Overview
                </CardHeader>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-sm flex items-center gap-2">
                            Total Downloads
                        </span>
                        <p className="text-muted-foreground ml-2">{totalDownloads}</p>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-sm flex items-center gap-2">
                            Daily Downloads
                        </span>
                        <p className="text-muted-foreground">{averageDownloads.toFixed(0)}</p>
                    </div>
                </div>
            </div>
            <CardContent className="p-0">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 20, left: -10, bottom: 10 }}
                    >
                        <CartesianGrid opacity={0.2} vertical={false} />
                        <XAxis tickMargin={5} dataKey="week" opacity={0.5} axisLine={false} tickLine={false} dy={10} padding={{ right: 30, left: 20 }} />
                        <YAxis opacity={0.5} axisLine={false} tickLine={false} cx={10} />
                        <Tooltip content={<TooltipMetricsDashboard nameMapping={nameMapping} />} />
                        <Legend verticalAlign="top" content={<LineChartLegend nameMapping={nameMapping} />} />
                        {['windows', 'linux', 'macos', 'total'].map((key) => (
                            <Line
                                key={key}
                                dot={false}
                                type="monotone"
                                dataKey={key}
                                stroke={colors[key]}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
            <CardFooter className="mt-4">
                <span className="text-sm flex items-center gap-2">Total Cumulative Downloads: <p className="text-muted-foreground">{totalDownloads}</p></span>
            </CardFooter>
        </Card>

    )
}

export default LineChartDasboard