import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../context/auth";
import Signin from "../../screens/Signin";
import Signup from "../../screens/Signup";
import Home from "../../screens/Home";
import HeaderTabs from "./HeaderTabs";
import Account from "../../screens/Account";
import Profile from "../../screens/Profile";
import Links from "../../screens/Links";
import PostLink from "../../screens/PostLink";
import LinkView from "../../screens/LinkView";
import TrendingLinks from "../../screens/TrendingLinks";

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
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Links Daily",
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ route }) => ({
              title: route.params?.name || "Profile",
              // headerTransparent: true,
              headerBackTitle: "",
              // headerTintColor: "#fff"
            })}
          />
          <Stack.Screen name="Links" component={Links} />
          <Stack.Screen
            name="Trending Links"
            component={TrendingLinks}
            options={{
              title: "Back",
            }}
          />
          <Stack.Screen
            name="LinkView"
            component={LinkView}
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="PostLink"
            component={PostLink}
            options={{
              title: "Post",
              headerRight: () => <HeaderTabs />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={Signup}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
