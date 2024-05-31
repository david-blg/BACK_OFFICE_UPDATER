import SectionPage from "@/layouts/SectionPage"
import Dashboard from "./Dashboard"

const DashboardSection = () => {

  return (
    <SectionPage
      title="Back Office "
      content={
        <Dashboard />
      } />
  )
}

export default DashboardSection