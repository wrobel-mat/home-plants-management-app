import "./WelcomePageContentContainer.css";

export default function WelcomePageContentContainer({children}) {
    return (
        <div className="welcome-page-content-container">
            {children}
        </div>
    );
}