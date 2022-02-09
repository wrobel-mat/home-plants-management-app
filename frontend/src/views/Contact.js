import {useLocalizedStrings} from 'providers/LocalizedStringsProvider'
import MainSectionContainer from "components/containers/MainSectionContainer/MainSectionContainer";
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import ContactDetails from 'components/molecules/Contact/ContactDetails';

export default function Contact() {
  const { strings } = useLocalizedStrings();
  return (
    <MainSectionContainer>
      <PageHeader title={strings.contactPage.title}/>
      <ContactDetails />
    </MainSectionContainer>);
}
