import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TooltipPieChart = ({ active, payload, label }: any) => {

  if (active && payload && payload.length) {

    console.log('Payload tooltip PieChart: ', payload)

    const tooltipContent = payload.map((item: any, index: number) => {


      return (
        <div key={index} className="flex items-center justify-start mt-2">
          <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: item.payload.color }}></div>
          <div className="text-xs ml-2 flex gap-1 ">
            <span>{item.name}:</span>
            <span className="text-muted-foreground">{item.value}</span>
          </div>
        </div>
      );
    });

    return (
      <div className="custom-tooltip ">
        <Card className="min-w-[150px] bg-background">
          <div className="flex items-start justify-center flex-col">
            {label &&
              <>
                <p className="label text-sm  text-muted-foreground p-2">{label}</p>
                <Separator className=" my-1 h-px bg-muted" />
              </>
            }
          </div>
          <div className="p-2">
            {tooltipContent}
          </div>
        </Card>
      </div>
    );

  }
  return null
};

export default TooltipPieChart