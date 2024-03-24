import React from "react";
import { Text, View } from "react-native";

import { Button } from "~/components/ui/Button";
import { useAuth } from "~/lib/ctx";

export default function SignupView() {
  // const { signOut, token } = useAuth();
  // const [user, setUser] = useState<{
  //   id: string;
  //   email: string;
  //   name: string;
  //   avatarUrl: string | null;
  //   emailVerified: boolean;
  // } | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (token) {
  //       const data = await fetchProtectedData(token);
  //       setUser(data.user);
  //     }
  //   };
  //   fetchData();
  // }, [token]);

  // if (!token) {
  //   return <Redirect href="/login" />;
  // }
const { signOut, token, user } = useAuth();
  return (
    <View className="flex h-full flex-col items-center justify-center px-2">
      <Text className="text-3xl text-center text-green-500">
        You logged in successfully {user.name}
      </Text>
      <Button
        onPress={() => {
          signOut();
        }}
      >
        Log out
      </Button>
    </View>
  );
}
