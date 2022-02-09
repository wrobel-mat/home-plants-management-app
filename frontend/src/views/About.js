import { useLocalizedStrings } from 'providers/LocalizedStringsProvider'
import MainSectionContainer from "components/containers/MainSectionContainer/MainSectionContainer";
import PageHeader from 'components/atoms/PageHeader/PageHeader'
import WelcomePageContentContainer from 'components/containers/WelcomePageContentContainer/WelcomePageContentContainer';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

export default function About() {
  const { strings } = useLocalizedStrings();
  return (
    <MainSectionContainer>
      <PageHeader title={strings.aboutPage.title}/>
      <WelcomePageContentContainer>
        <Paragraph text={strings.welcomePage.firstParagraph} />
        <Paragraph text={strings.welcomePage.secondParagraph} />
        <Paragraph text={strings.welcomePage.thirdParagraph} />
        <Paragraph text={strings.welcomePage.fourthParagraph} />
      </WelcomePageContentContainer>
    </MainSectionContainer>
  );
}
