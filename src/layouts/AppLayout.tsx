import { useLocation } from "react-router-dom";
// import Navbar from "../custom/navigation/Navbar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import Sidebar from "@/navigation/sidebar/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from "@/navigation/footer/Footer";
import useAWSSession from "@/hooks/useAWSSession";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    const currentPath = useLocation().pathname;
    const [isCollapsed, setIsCollapsed] = useState(false)
    useAWSSession();
    const layout = Cookies.get("react-resizable-panels:layout")

    const defaultLayout = layout ? JSON.parse(layout) : [18, 80]

    return (
        <div className="h-screen">
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full items-stretch"
            >
                <ResizablePanel
                    onCollapse={(collapsed: boolean) => {
                        setIsCollapsed(collapsed)
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            collapsed
                        )}`
                    }}
                    minSize={18}
                    maxSize={18}
                    collapsedSize={1}
                    defaultSize={defaultLayout[0]}
                    collapsible={true}
                    className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
                >
                    <div className="flex h-full bg-card">
                        <Sidebar isCollapsed={isCollapsed} />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="relative">
                    {/* <Navbar /> */}
                    <ScrollArea
                        style={currentPath === "/" ? { height: "calc(100vh" } : { height: "100%" }}
                    >
                        <div className="px-8 py-8 w-full mx-auto max-w-[1500px]">
                            {children}
                        </div>
                    </ScrollArea>
                    <Footer />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default AppLayout;
