import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CloudUpload, UploadIcon } from "lucide-react"

interface CardUploadFileProps {
    onClick?: () => void
}

const CardUploadFile = ({ onClick }: CardUploadFileProps) => {


    return (
        <Card className=" rounded-xl cursor-pointer">
            <div className="flex flex-col justify-center">
                <div className="p-10 h-full">
                    <CardContent className="border rounded-lg p-6  flex flex-col justify-center items-center">
                        <div className="flex items-center">
                            <CloudUpload size={100} strokeWidth={1.5} />
                        </div>
                        <div>
                            <div>
                                <span className=" flex flex-col text-muted-foreground text-center">
                                    Drag and drop to upload application installers here
                                    <span> or</span>
                                </span>
                            </div>
                            <div className="w-full h-full pt-4">
                                <div className="flex justify-center">
                                    <Button onClick={onClick} className=" gap-2">
                                        <UploadIcon size={16} />
                                        Select files
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}

export default CardUploadFile