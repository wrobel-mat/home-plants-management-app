import { useLocalizedStrings } from "providers/LocalizedStringsProvider";
import { linkedinIcon, githubIcon } from "assets/icons";
import './ContactDetails.css';

export default function ContactDetails() {
    const { strings } = useLocalizedStrings();
    return (
        <address className="contact-details-container">
            <div className="contact-details-header">
                {strings.contactPage.createdBy}
            </div>
            <div className="contact-details-value">
                {strings.contactPage.myName}
            </div>
            <div className="contact-details-header">
                {strings.contactPage.contactInfo}
            </div>
            <div className="contact-details-value">
                {strings.contactPage.email} <a href="mailto:wrobel_mat@icloud.com">wrobel_mat@icloud.com</a>
            </div>
            <div className="contact-details-value">
                {strings.contactPage.phoneNumber} <a href="tel:+48725600165">+48 725 600 165</a>
            </div>
            <div className="contact-details-btn-list">
            <a
                href="https://www.linkedin.com/in/wrobel-mat/"
                target="_blank"
                rel="noreferrer"
            >
                {linkedinIcon}
            </a>
            <a 
                href="https://github.com/wrobel-mat"
                target="_blank"
                rel="noreferrer"
            >
                {githubIcon}
            </a>
            </div>
        </address>
    );
}