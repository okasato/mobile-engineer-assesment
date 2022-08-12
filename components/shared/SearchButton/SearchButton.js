import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0080FF",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

const SearchButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.container}
    >
      <FontAwesome name="search" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

export default SearchButton;
