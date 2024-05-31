import { SidebarButton } from "@/components/ui/button"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "@/assets/logo-brender-studio.svg"
import { Separator } from "@/components/ui/separator"
import React, { useEffect } from "react"
import { bottomRoutes, topRoutes } from "@/routes/SidebarRoutes"
import { getVersion } from '@tauri-apps/api/app';

// import { useFormStore } from "@/store/useFormStore"

interface SidebarProps {
  isCollapsed: boolean
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  // const { clearAllFormStates, setIsFolder } = useFormStore()
  const [appVersion, setAppVersion] = React.useState<string>("0.0.0")


  const navigate = useNavigate()
  const currentPath = useLocation().pathname

  const handleNavigate = (path: string) => {
    navigate(path)
  }


  const handleGetVersion = async () => {
    const version = await getVersion()
    console.log(version)
    setAppVersion(version)
  }

  useEffect(() => {
    handleGetVersion()
  }, [])

  return (
    <div className="flex flex-col w-full">
      <div className="py-3">
        <div className={isCollapsed ? "px-2 flex items-center justify-center" : "flex items-center justify-between px-2 ml-[0.30rem]"}>
          <img src={logo} alt="Logo" className="h-6 min-w-6" />
          <small className={isCollapsed ? "hidden" : "text-muted-foreground mr-2"}>
            {appVersion ? `v${appVersion}` : "v0.0.0"}
          </small>
        </div>
      </div>
      <div className="flex flex-col h-full justify-between">
        <div>

          {topRoutes.map((route, index) => (
            <React.Fragment key={index}>
              <SidebarButton
                className={`w-full rounded-none ${currentPath === route.path || currentPath.startsWith(`${route.path}/`) ? "bg-accent text-white border border-l-2 border-l-[#F63652]" : "font-normal text-muted-foreground"}`}
                variant={currentPath === route.path || currentPath.startsWith(`${route.path}/`) ? "secondary" : "ghost" as any}
                key={index}
                onClick={() => handleNavigate(route.path)}
              >
                <div className="mr-2">
                  {route.icon}
                </div>
                {!isCollapsed && (
                  <p>
                    {route.name}
                  </p>
                )}
              </SidebarButton>
              {index === 0 && <Separator className="my-2" />}
              {index === 3 && <Separator className="my-2" />}
              {index === 5 && <Separator className="my-2" />}

            </React.Fragment>
          ))}
        </div>
        <div className="pb-6">
          <Separator className="my-2" />
          {bottomRoutes.map((route, index) => (
            <SidebarButton
              className={`w-full rounded-none ${currentPath === route.path ? "bg-accent text-white border border-l-2 border-l-[#F63652]" : "font-normal text-muted-foreground"}`}
              variant={currentPath === route.path ? "secondary" : "ghost" as any}
              key={index}
              onClick={() => handleNavigate(route.path)}
            >
              <div className="mr-2">
                {route.icon}
              </div>
              {!isCollapsed && (
                <p>
                  {route.name}
                </p>
              )}
            </SidebarButton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar