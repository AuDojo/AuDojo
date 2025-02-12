import informatikzentrumJPG from "@/assets/informatikzentrum.jpg";
import { useSetTitle } from "@/hooks/useSetTitle";
import parse from "html-react-parser";
import React from "react";
import { useTranslation } from "react-i18next";
import kontaktStyles from "./Kontakt.module.css";

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
    error: false,
  });

  const [showDiv, setShowDiv] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
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
      [name]: true, // Setze den Fehler für das aktuelle Feld (name) zurück
    }));
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showSuccessMessage = () => {
    setShowDiv(true);

    setTimeout(() => {
      setShowDiv(false);
      if (successMessage) {
        setSuccessMessage("");
      } else {
        setErrorMessage("");
      }
    }, 4000);
  };

  const validateForm = () => {
    const newErrors = {
      firstName: true,
      lastName: true,
      message: true,
      email: true,
      subject: true,
      error: false,
    };

    if (!firstName.trim()) {
      newErrors.firstName = false;
      newErrors.error = true;
    }
    if (!lastName.trim()) {
      newErrors.lastName = false;
      newErrors.error = true;
    }
    if (!message.trim()) {
      newErrors.message = false;
      newErrors.error = true;
    }
    if (!validateEmail(email)) {
      newErrors.email = false;
      newErrors.error = true;
    }

    setErrors(newErrors);

    return newErrors.error;
  };

  const submitContactForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault(); //verhindert neuladen der Seite

    if (validateForm()) {
      return;
    }
    const data = {
      firstName,
      lastName,
      email,
      message,
      subject,
    };
    try {
      const response = await fetch("/projects/audojo/api/mail", {
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
        setSubject("");
      } else {
        setErrorMessage("Es gab einen Fehler beim senden der Nachricht");
        showSuccessMessage();
      }
    } catch (error) {
      console.error("Fehler: ", error);
      setErrorMessage("Ein Fehler ist aufgetreten");
      showSuccessMessage();
    }
  };
  const { t } = useTranslation("contact");
  useSetTitle("Kontakt");
  return (
    <div className={kontaktStyles.generalContainer}>
      <div className={kontaktStyles.kontaktMessageContainer}>
        <p className={kontaktStyles.kontaktMessage}> {t("title") /* Kontakt */} </p>
      </div>

      <div className={kontaktStyles.contentContainer}>
        <div className={kontaktStyles.leftContainer}>
          {showDiv && (
            <div className={successMessage ? kontaktStyles.successMessage : kontaktStyles.errorMessage}>
              {" "}
              {successMessage ? successMessage : errorMessage}
              <button className={kontaktStyles.closeButton} onClick={() => setShowDiv(false)}>
                x
              </button>
            </div>
          )}
          <div className={kontaktStyles.formHeading}>
            <p>{t("emailField.title") /* Sende uns eine Nachricht!*/}</p>
          </div>

          <div className={kontaktStyles.namesContainer}>
            <input
              name="firstName"
              placeholder={t("emailField.firstName") /* Vorname* */}
              className={errors.firstName ? kontaktStyles.nameInput : kontaktStyles.nameInputError}
              onChange={handleInputChange}
              value={firstName}
              maxLength={100}
              required
            />
            <input
              name="lastName"
              placeholder={t("emailField.lastName") /* Nachname* */}
              className={errors.lastName ? kontaktStyles.nameInput : kontaktStyles.nameInputError}
              onChange={handleInputChange}
              value={lastName}
              maxLength={100}
              required
            />
          </div>
          <input
            name="email"
            placeholder={t("emailField.email") /* Email */}
            className={errors.email ? kontaktStyles.emailInput : kontaktStyles.emailInputError}
            onChange={handleInputChange}
            maxLength={100}
            value={email}
          />

          <input
            name="subject"
            placeholder={t("emailField.subject") /* Betreff */}
            className={kontaktStyles.emailInput}
            maxLength={50}
            onChange={handleInputChange}
            value={subject}
          />

          <textarea
            maxLength={maxChars}
            name="message"
            placeholder={t("emailField.field") /* Deine Nachricht */}
            rows={10}
            cols={30}
            value={message}
            className={errors.message ? kontaktStyles.messageInput : kontaktStyles.messageInputError}
            onChange={handleInputChange}
          />
          <div>
            <p className={kontaktStyles.remainingCharacters}>
              {message.length > 0
                ? `${maxChars - message.length} ` + t("emailField.charLeft") /* verbleibende Zeichen */
                : ""}
            </p>
          </div>
          <button className={kontaktStyles.sendButton} onClick={submitContactForm}>
            {t("emailField.sendButton") /* Nachricht senden */}
          </button>
          <p className={kontaktStyles.pflichtfelderHinweis}>
            {" "}
            {t("emailField.notice") /*mit * markierte Felder sind Pflichtfelder*/}{" "}
          </p>
        </div>
        <div className={kontaktStyles.rightContainer}>
          <div className={kontaktStyles.formHeading}>
            <p>{t("info.title") /* Kontaktinformationen */}</p>
          </div>
          <div className={kontaktStyles.kontaktdetailsContainer}>
            <p>
              {
                parse(
                  t("info.sentence")
                ) /* Feedback ist uns wichtig! Scheut euch nicht davor Verbesserungsvorschläge oder Anmerkungen zu äußern. */
              }
            </p>
            <div className={kontaktStyles.addressContainer}>
              <div>
                <img src={informatikzentrumJPG} className={kontaktStyles.addressImage} />
              </div>
              <div>
                <p className={kontaktStyles.addressInfo}>
                  {" "}
                  {t("info.institute") /* Institut für Betriebssysteme und Rechnerverbund */}{" "}
                </p>
                <p> {t("info.center") /* Informatikzentrum */} </p>
                <p> {t("info.address1") /* Mühlenpdordstraße 23 */} </p>
                <p> {t("info.address2") /* 38106 Braunschweig */} </p>
                <p> {t("info.email") /* audojo@tu-bs.de */}</p>
              </div>
            </div>
          </div>

          <section className={kontaktStyles.credits}>
            <i>Made with ❤️ by Maximo Strohmann, Jan Detmers, Minseo Kim, An Hoang and Thuy Trang Nguyen</i>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Kontakt;
