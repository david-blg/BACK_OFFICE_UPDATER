


const PieChartLegend = (props: any) => {
    const { payload } = props;

    return (
        <div className="flex flex-col items-start  gap-2 pt-4">
            {payload.map((entry: any, index: number) => (
                <div key={`item-${index}`} className="flex items-center">
                    <div className={`w-2 h-2 mr-2 rounded-full flex items-center`} style={{ backgroundColor: entry.color }} />
                    <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{entry.value}</span>
                    <span className="text-sm text-muted-foreground">{entry.payload.percent}%</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default PieChartLegend