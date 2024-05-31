import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SectionPageProps = {
    title: string;
    description?: string
    content: React.ReactNode;
    backBtn?: boolean;
};

const SectionPage = ({ title, content, backBtn, description }: SectionPageProps) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <div className="flex mt-4 gap-2 items-center">
                {
                    backBtn && (
                        <Button
                            className="hover:bg-white/10 z-30 rounded-full"
                            variant='link'
                            size="icon"
                            onClick={handleBack}
                        >
                            <ChevronLeft size={16} />
                        </Button>
                    )
                }
                <h2 className="font-medium text-2xl">{title}</h2>
            </div>
                <span className="text-muted-foreground">{description}</span>
            <div className="pb-4">{content}</div>
        </div>
    )
}

export default SectionPage