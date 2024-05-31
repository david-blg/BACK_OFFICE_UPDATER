import WelcomeDashboard from "./WelcomeDashboard"
import CountDownloads from "./CountDownloads";
import MetricsDashboard from "../metrics/MetricsDashboard";

const Dashboard = () => {


  return (
    <div className="">
      <WelcomeDashboard />
      <CountDownloads />
      <MetricsDashboard />
    </div>
  )
}

export default Dashboard