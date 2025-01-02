import React from "react";
import { Footer, Header } from "@components/homepage";
import generalStyles from "@styles/homepage/general.module.css";
import  kontaktStyles  from "@styles/Kontakt/Kontakt.module.css";
import mainStyles from "@styles/homepage/Main.module.css";
import informatikzentrumJPG from "@assets/informatikzentrum.jpg"

function Kontakt() {
    const maxChars = 1000;

    const [message, setMessage] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        console.log(name)
        switch (name) {
            case "message":
                setMessage(value);
                break;
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "email":
                setEmail(value);
                break;
            default:
                break;
        }
    };

    const validateEmail = (email : string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    const submitContactForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setSuccessMessage("Deine Nachricht wurde erfolgreich versendet, vielen Dank!")

        if(!validateEmail(email)) {
            setEmail("Bitte geben Sie eine gültige E-Mail-Adresse ein");
            return;
        }

        const data = {
            firstName,
            lastName,
            email,
            message
        };

        try {
            const response = await fetch("/api/mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if(response.ok) {
                alert("Nachricht erfolgreich gesendet")
                setEmail("");
                setMessage("");
                setFirstName("");
                setLastName("");
            } else {
                alert("Fehler beim senden der Nachricht.");
            }

        } catch(error) {
            console.error("Fehler: ", error);
            alert("Ein Fehler ist aufgetreten")
        }
    }

    return(
        <div className={kontaktStyles.generalContainer} > 
            <Header />
            <div className={kontaktStyles.kontaktMessageContainer}>
                <p className={kontaktStyles.kontaktMessage}> Kontakt </p>
             </div>

            <div className={kontaktStyles.contentContainer}>
                <div className={kontaktStyles.leftContainer}>
                    <div className={
                        successMessage ? kontaktStyles.successMessage : kontaktStyles.errorMessage}>
                            {successMessage}
                    </div>
                    <div className={kontaktStyles.formHeading}>
                        <p>Sende uns eine Nachricht</p>
                    </div>

                    <div className={kontaktStyles.namesContainer}>
                        <input 
                            name="firstName" 
                            placeholder="Vorname*" 
                            className={kontaktStyles.nameInput} 
                            onChange={handleInputChange} 
                            required
                        />
                        <input name="lastName" 
                            placeholder="Nachname*" 
                            className={kontaktStyles.nameInput} 
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <input name="email"placeholder="Email" className={kontaktStyles.emailInput} onChange={handleInputChange}></input>
                    <input name="subject "placeholder="Betreff" className={kontaktStyles.emailInput} onChange={handleInputChange}></input>
                    <textarea maxLength={maxChars} 
                            name="message"
                            placeholder="Deine Nachricht*" 
                            rows={10} 
                            cols={30} 
                            className={kontaktStyles.messageInput} 
                            onChange={handleInputChange}
                    />
                    <div>
                        <p className={kontaktStyles.remainingCharacters}> 
                            {message.length > 0 ? `${maxChars - message.length} verbleibende Zeichen` : "" }  
                        </p>
                   </div>
                    <button 
                        className={kontaktStyles.sendButton}
                        onClick={submitContactForm}> 
                        Nachricht senden
                    </button>
                    <p className={kontaktStyles.pflichtfelderHinweis}> 
                        mit * markierte Felder sind Pflichtfelder
                    </p>
                </div>

                <div className={kontaktStyles.rightContainer}> 
                    <div className={kontaktStyles.formHeading}>
                        <p>Kontaktinformationen</p>
                    </div>
                    <div className={kontaktStyles.kontaktdetailsContainer}>
                        <p> Feedback ist uns wichtig! Scheut euch nicht davor Verbesserungsvorschläge oder Anmerkungen zu äußern.</p>
                        <div className={kontaktStyles.addressContainer}>
                            <div>
                                <img src={informatikzentrumJPG} className={kontaktStyles.addressImage}/>
                            </div>
                            <div>
                                <p className={kontaktStyles.addressInfo}> Institut für Betriebssysteme und Rechnerverbund </p>
                                <p> Informatikzentrum </p>
                                <p> Mühlenpdordstraße 23 </p>
                                <p> 38106 Braunschweig </p>
                                <p> audojo@tu-bs.de</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Kontakt;