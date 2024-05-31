import SectionPage from "@/layouts/SectionPage"
import UploadFileSection from "./UploadFileSection"

const UploadSection = () => {
  return (
    <>
      <SectionPage
        title="Installer Uploads"
        description="Use this section to upload application installers by version to Amazon S3."
        content={
          <UploadFileSection />
        }
      />
    </>
  )
}

export default UploadSection