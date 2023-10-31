import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "../../screens/Signin";
import Signup from "../../screens/Signup";
import Home from "../../screens/Home";
import { AuthContext } from "../../context/auth";
import HeaderTabs from "./HeaderTabs";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  const [state, setState] = useContext(AuthContext);

  const authenticated = state && state.token !== "" && state.user !== null;

  return (
    <Stack.Navigator
      initialRouteName="Home"
    //   screenOptions={{ headerShown: false }}
    >
      {authenticated ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Links Daily",
            headerRight: () => <HeaderTabs />,
          }}
        />
      ) : (
        <>
          <Stack.Screen name="SignIn" component={Signin} />
          <Stack.Screen name="SignUp" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
}
