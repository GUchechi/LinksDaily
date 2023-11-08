import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const SubmitButton = ({ title, handleSubmit, loading }) => {
  return (
    <TouchableOpacity onPress={handleSubmit} style={styles.touchable}>
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}>
        {loading ? "Please Wait..." : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: "#ff9900",
    justifyContent: "center",
    height: 50,
    marginBottom: 20,
    marginHorizontal: 24,
    borderRadius: 24,
  },
});

export default SubmitButton;
