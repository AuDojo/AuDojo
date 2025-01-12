import { AppProvider } from "./provider";
import { AppRouter } from "./Router";

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
