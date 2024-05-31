import SectionPage from "@/layouts/SectionPage"
import ConfigSettings from "./ConfigSettings"

const SettingsSection = () => {
  return (
    <SectionPage
      title="Settings"
      content={
        <ConfigSettings />
      } />
  )
}

export default SettingsSection