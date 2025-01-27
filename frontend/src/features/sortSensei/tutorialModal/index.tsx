import { TutorialStepsProvider } from "./context/TutorialStepsContext";
import TutorialModalContent from "./TutorialModalContent";

export const TutorialModal = () => (
  <TutorialStepsProvider>
    <TutorialModalContent />
  </TutorialStepsProvider>
);
