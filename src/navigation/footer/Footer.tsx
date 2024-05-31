import ProfileSelect from "@/components/custom/selects/ProfileSelect";
import StackSelect from "@/components/custom/selects/StackSelect";
import { FooterButton } from "@/components/ui/button"
import { useUserSessionStore } from "@/store/useSessionStore";

const Footer = () => {

    const { getSessionData } = useUserSessionStore();
    const sessionData = getSessionData();
    const { isCliInstalled } = sessionData;


  return (
    <div className='absolute bottom-0 w-full bg-card h-[1.5rem] flex items-center'>
    <div className="flex w-full justify-between">
        <div className="flex items-center">
            <FooterButton size='footer' variant="footer" className="text-muted-foreground hover:bg-transparent cursor-default gap-2 flex items-center">
                {isCliInstalled ? <div className="w-2 h-2 bg-green-500 rounded-full"></div> : <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                <small className="text-muted-foreground text-xs">
                    {isCliInstalled ? 'AWS CLI v2 Enabled' : 'AWS CLI v2 Not Installed'}
                </small>
            </FooterButton>
        </div>

        <div className="flex">
            <ProfileSelect />
            <StackSelect />
        </div>
    </div>
</div>
  )
}

export default Footer