import { useUserSessionStore } from "@/store/useSessionStore"

const WelcomeDashboard = () => {

    const { getSessionData } = useUserSessionStore()
    const sessionData = getSessionData()
    const user = sessionData && sessionData?.currentProfile
    const date = new Date()


    return (
        <>
            <p className="text-sm text-muted-foreground">{date.toDateString()}</p>
            <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-medium">Welcome {user}, to</p>
                <p className="text-2xl font-medium">
                    Dashboard Brender Studio
                </p>
            </div>
        </>
    )
}

export default WelcomeDashboard