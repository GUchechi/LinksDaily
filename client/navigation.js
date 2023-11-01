import { AuthProvider } from "./context/auth";
import { NavigationContainer } from "@react-navigation/native";
import ScreensNav from "./components/nav/ScreensNav";


export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ScreensNav />
      </AuthProvider>
    </NavigationContainer>
  );
}
