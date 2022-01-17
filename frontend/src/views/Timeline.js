import { useLocalizedStrings } from 'providers/LocalizedStringsProvider'
import MainSectionContainer from "components/containers/MainSectionContainer/MainSectionContainer";
import PageHeader from 'components/atoms/PageHeader/PageHeader'
import WebsiteUnderConstruction from 'components/atoms/WebsiteUnderConstruction/WebsiteUnderConstruction'

export default function Timeline() {
  const { strings } = useLocalizedStrings();
  return (
    <MainSectionContainer>
      <PageHeader title={strings.timelinePage.title}/>
      <WebsiteUnderConstruction/>
    </MainSectionContainer>
  );
}
