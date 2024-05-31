import { Select, SelectContent, SelectGroup, SelectItem, SelectTriggerFooter, SelectValueFooter } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { awsRegionsByContinent } from '@/lib/awsRegionByContinent';
import { useUserSessionStore } from '@/store/useSessionStore';


const RegionSelect = () => {
  // const { currentAwsRegion, setCurrentAwsRegion,  cleanUpCurrentStack } = useUserSessionStore()
  const { getSessionData, setSessionData } = useUserSessionStore();
  const sessionData = getSessionData();
  const { currentAwsRegion } = sessionData;

  const handleRegionChange = (value: string) => {
    console.log('value', value)
    const selectedRegion = value;
    // setCurrentAwsRegion(selectedRegion);
    // cleanUpCurrentStack();
    setSessionData({
      ...sessionData,
      currentAwsRegion: selectedRegion, currentStack: null
    });
  }

  return (
    <>
      <Select onValueChange={handleRegionChange} defaultValue={currentAwsRegion!} value={currentAwsRegion}>
        <SelectTriggerFooter className="flex items-center">
          <SelectValueFooter placeholder={currentAwsRegion} defaultValue={currentAwsRegion!} />
        </SelectTriggerFooter>
        <SelectContent className='w-48'>
          {Object.entries(awsRegionsByContinent).map(([continent, continentRegions]) => (
            <div key={continent}>
              <SelectGroup>
                {continent !== 'North America' && <Separator className="my-2" />}
                <h2 className="ml-2 text-sm font-semibold my-2">{continent}</h2>
                {continentRegions.map((region) => (
                  <SelectItem
                    key={region}
                    value={region || "unassigned"}
                    defaultValue={currentAwsRegion!}
                  >
                    {region}
                  </SelectItem>
                ))}
              </SelectGroup>
            </div>
          ))}
        </SelectContent>
      </Select>
    </>

  )
}

export default RegionSelect