import SectionPage from "@/layouts/SectionPage"
import Downloads from "./Downloads"

const DownloadSection = () => {
  return (
    <SectionPage
      title="Downloads Overview"
      description="Use this section to analyze the downloads of BrenderStudio."
      content={
        <Downloads />
      } />
  )
}

export default DownloadSection