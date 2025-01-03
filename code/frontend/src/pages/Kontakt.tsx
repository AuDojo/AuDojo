import React from "react";
import { Footer, Header } from "@components/homepage";
import generalStyles from "@styles/homepage/general.module.css";
import kontaktStyles from "@styles/Kontakt/Kontakt.module.css";
import mainStyles from "@styles/homepage/Main.module.css";
import informatikzentrumJPG from "@assets/informatikzentrum.jpg"

function Kontakt() {
  const maxChars = 1000;

  const [message, setMessage] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errors, setErrors] = React.useState({
    firstName: true,
    lastName: true,
    message: true,
    email: true,
    subject: true,
    error: false
  })

  const [showDiv, setShowDiv] = React.useState(false);


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
      case "subject":
        setSubject(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors, // Behalte alle vorherigen Fehler bei
      [name]: true,   // Setze den Fehler für das aktuelle Feld (name) zurück
    }));

  };

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const showSuccessMessage = () => {
    setShowDiv(true);

    setTimeout(() => {
      setShowDiv(false)
      successMessage ? setSuccessMessage("") : setErrorMessage("");
    }, 4000)
  }

  const validateForm = () => {
    const newErrors = {
      firstName: true,
      lastName: true,
      message: true,
      email: true,
      error: false
    };

    if (!firstName.trim()) {
      newErrors.firstName = false;
      newErrors.error = true;
    }
    if (!lastName.trim()) {
      newErrors.lastName = false;
      newErrors.error = true
    };
    if (!message.trim()) {
      newErrors.message = false;
      newErrors.error = true;
    }
    if (!validateEmail(email)) {
      newErrors.email = false;
      newErrors.error = true;
    }

    setErrors(newErrors)

    return newErrors.error;
  }

  const submitContactForm = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); //verhindert neuladen der Seite

    if (validateForm()) {
      return
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

      if (response.ok) {
        setSuccessMessage("Nachricht wurde erfolgreich gesendet!");
        showSuccessMessage();
        setEmail("");
        setMessage("");
        setFirstName("");
        setLastName("");
      } else {
        setErrorMessage("Es gab einen Fehler beim senden der Nachricht")
        showSuccessMessage();
      }

    } catch (error) {
      console.error("Fehler: ", error);
      setErrorMessage("Ein Fehler ist aufgetreten")
      showSuccessMessage();
    }
  }

  return (
    <div className={kontaktStyles.generalContainer} >
      <Header />
      <div className={kontaktStyles.kontaktMessageContainer}>
        <p className={kontaktStyles.kontaktMessage}> Kontakt </p>
      </div>

      <div className={kontaktStyles.contentContainer}>
        <div className={kontaktStyles.leftContainer}>
          {showDiv && (<div className={
            successMessage ? kontaktStyles.successMessage : kontaktStyles.errorMessage}> {successMessage ? successMessage : errorMessage}
            <button className={kontaktStyles.closeButton}
              onClick={() => setShowDiv(false)}
            >
              x
            </button>
          </div>)}
          <div className={kontaktStyles.formHeading}>
            <p>Sende uns eine Nachricht!</p>
          </div>

          <div className={kontaktStyles.namesContainer}>
            <input
              name="firstName"
              placeholder="Vorname*"
              className={errors.firstName ? kontaktStyles.nameInput : kontaktStyles.nameInputError}
              onChange={handleInputChange}
              value={firstName}
              maxLength={100}
              required
            />
            <input name="lastName"
              placeholder="Nachname*"
              className={errors.lastName ? kontaktStyles.nameInput : kontaktStyles.nameInputError}
              onChange={handleInputChange}
              value={lastName}
              maxLength={100}
              required
            />
          </div>
          <input name="email"
            placeholder="Email"
            className={errors.email ? kontaktStyles.emailInput : kontaktStyles.emailInputError}
            onChange={handleInputChange}
            maxLength={100}
            value={email}
          />

          <input name="subject "
            placeholder="Betreff"
            className={kontaktStyles.emailInput}
            maxLength={50}
            onChange={handleInputChange}
          />

          <textarea maxLength={maxChars}
            name="message"
            placeholder="Deine Nachricht*"
            rows={10}
            cols={30}
            value={message}
            className={errors.message ? kontaktStyles.messageInput : kontaktStyles.messageInputError}
            onChange={handleInputChange}
          />
          <div>
            <p className={kontaktStyles.remainingCharacters}>
              {message.length > 0 ? `${maxChars - message.length} verbleibende Zeichen` : ""}
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
                <img src={informatikzentrumJPG} className={kontaktStyles.addressImage} />
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
      <Footer />
    </div>
  );
}

export default Kontakt;