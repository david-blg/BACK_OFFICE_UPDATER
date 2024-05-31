import SectionPage from "@/layouts/SectionPage"
import CostExplorer from "./CostExplorer"

const CostExplorerSection = () => {
  return (
    <SectionPage
      title="Cost Explorer"
      content={
        <CostExplorer />
      } />
  )
}

export default CostExplorerSection