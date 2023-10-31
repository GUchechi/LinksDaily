import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "../../screens/Signin";
import Signup from "../../screens/Signup";
import Home from "../../screens/Home";
import { AuthContext } from "../../context/auth";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  const [state, setState] = useContext(AuthContext);

  const autenticated = state && state.token !== "" && state.user !== null;

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      {autenticated ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <>
          <Stack.Screen name="SignIn" component={Signin} />
          <Stack.Screen name="SignUp" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
}
