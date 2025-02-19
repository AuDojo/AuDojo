import { AppProvider } from "./Provider";
import { AppRouter } from "./Router";

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
