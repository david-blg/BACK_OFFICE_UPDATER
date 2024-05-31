
const LineChartLegend = (props: any) => {
  const { payload, nameMapping } = props;

  return (
    <div className="flex items-center justify-start gap-4 ml-8 pb-6">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center">
          <div className={`w-2 h-2 mr-2 rounded-full flex items-center`} style={{ backgroundColor: entry.color }} />
          <span className="text-sm text-muted-foreground">{nameMapping[entry.value]}</span> 
        </div>
      ))}
    </div>
  );
};
export default LineChartLegend