import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./context/auth";
import ScreensNav from "./components/nav/ScreensNav";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ScreensNav />
      </AuthProvider>
    </NavigationContainer>
  );
}
