import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { Fonts } from "../../../constants";

const styles = StyleSheet.create({
  textInputStyle: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    borderRadius: 4,
    paddingLeft: 20,
    paddingVertical: 15,
    borderWidth: 0.8,
    borderColor: "#262626",
    fontSize: Fonts.size.medium,
    color: "#262626",
  },
});

const Custom_TextInput = ({
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  onEndEditing,
  style,
}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        style={[styles.textInputStyle, style]}
        autoCapitalize="none"
        editable={true}
      />
    </View>
  );
};

export default Custom_TextInput;
