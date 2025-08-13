import { Image, LogBox, StyleSheet, Text, View } from "react-native";
import React from "react";
import Style from "../../style/Style";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getUserToken, getVerificationToken } from "../../utils/common";
import { Get } from "../../services/api";
import { setUser } from "../../store/slices/userSlice";

const Splash = ({ navigation }) => {
  const dispatch = useDispatch();
 
  useFocusEffect(
    React.useCallback(() => {
        LogBox.ignoreAllLogs()
      setTimeout(() => {
        userToken();
      }, 1000);

    //   navigation.navigate('AccountDetails')
    }, [])
  );

  const userToken = async () => {
    const token = await getUserToken();
    const verificationToken = await getVerificationToken();
    if (token) {
        getUser()
    //   navigation.navigate("Main");
    } else if (verificationToken) {
      navigation.navigate("OtpVerification", {
        verificationToken: verificationToken,
      });
    } else {
      navigation.navigate("Login");
    }
  };


  const getUser = async () => {
    
    Get({
      endpoint: "users/me",
    })
      .then((res) => {
        console.warn("res", res);
       const user = res?.data?.user
       dispatch(setUser(user))
    //    navigation.navigate("Main");
       navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    
      
      })
      .catch((err) => {
        navigation.navigate("Login");
        console.warn("err", err);
        
      });
  };
  return (
    <View
      style={[
        Style.container,
        { flex: 1 },
        Style.alignCenter,
        Style.justifyCenter,
      ]}
    >
      <Image
        source={require("../../assets/images/login-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  logo: {
    width: 192,
    height: 44.5,
    marginTop: 12,
    marginBottom: 8,
  },
});
