import { useState } from "react";
import Header from "../components/Header/Header.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Signals from "../components/Signals/Signals.jsx";
import Framework from "../components/Framework/Framework.jsx";
import Presence from "../components/Presence/Presence.jsx";
import Invitation from "../components/Invitation/Invitation.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ContactModal from "../components/Hero/ContactModal.jsx";
import WelcomeModal from "../components/Shared/WelcomeModal.jsx";
import samsoniteLogo from "../assets/logo/samsoniteLogo.png";

export default function LandingSamsonite() {
    const [isContactOpen, setContactOpen] = useState(false);
    const [isWelcomeOpen, setWelcomeOpen] = useState(true);
    const openContact = () => setContactOpen(true);

    return (
        <>
            <Header onContactClick={openContact} />
            <main>
                <Hero onContactClick={openContact} />
                <Signals customerLogo={samsoniteLogo} />
                <Framework />
                <Presence />
                <Invitation onContactClick={openContact} />
            </main>
            <Footer />
            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
            />
            <WelcomeModal
                isOpen={isWelcomeOpen}
                onClose={() => setWelcomeOpen(false)}
                customerLogo={samsoniteLogo}
            />
        </>
    );
}
