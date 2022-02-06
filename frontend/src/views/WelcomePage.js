import { useNavigate } from "react-router-dom";
import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import MainSectionContainer from "components/containers/MainSectionContainer/MainSectionContainer";
import PageHeader from "components/atoms/PageHeader/PageHeader";
import WelcomePageContentContainer from "components/containers/WelcomePageContentContainer/WelcomePageContentContainer";
import Paragraph from "components/atoms/Paragraph/Paragraph";
import ButtonWrapper from "components/containers/ButtonWrapper/ButtonWrapper";
import Button from "components/atoms/Button/Button";

export default function WelcomePage() {
    const navigate = useNavigate();
    const { strings } = useLocalizedStrings();
    return (
        <MainSectionContainer>
            <PageHeader title={strings.welcomePage.title} centered />
            <WelcomePageContentContainer>
                <Paragraph text={strings.welcomePage.firstParagraph} />
                <Paragraph text={strings.welcomePage.secondParagraph} />
                <Paragraph text={strings.welcomePage.thirdParagraph} />
                <Paragraph text={strings.welcomePage.fourthParagraph} />
            </WelcomePageContentContainer>
            <ButtonWrapper>
                <Button text={strings.welcomePage.authBtn} type="button" onClick={() => navigate("/auth")}/>
            </ButtonWrapper>
        </MainSectionContainer>
    );
}