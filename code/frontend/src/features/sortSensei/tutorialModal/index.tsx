import { TutorialStepsProvider } from "./context/TutorialStepsProvider";
import TutorialModalContent from "./TutorialModalContent";

export const TutorialModal = () => (
  <TutorialStepsProvider>
    <TutorialModalContent />
  </TutorialStepsProvider>
);
