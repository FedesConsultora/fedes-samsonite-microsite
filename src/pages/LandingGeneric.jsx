import { useState } from "react";
import Header from "../components/Header/Header.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Signals from "../components/Signals/Signals.jsx";
import Framework from "../components/Framework/Framework.jsx";
import Presence from "../components/Presence/Presence.jsx";
import Invitation from "../components/Invitation/Invitation.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ContactModal from "../components/Hero/ContactModal.jsx";

export default function LandingGeneric() {
    const [isContactOpen, setContactOpen] = useState(false);
    const openContact = () => setContactOpen(true);

    return (
        <>
            <Header onContactClick={openContact} />
            <main>
                <Hero onContactClick={openContact} />
                <Signals />
                <Framework />
                <Presence />
                <Invitation onContactClick={openContact} />
            </main>
            <Footer />
            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
            />
        </>
    );
}
