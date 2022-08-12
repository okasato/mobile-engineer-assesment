import React from "react";
import { Text, StyleSheet } from "react-native";

import { Fonts } from "../../../constants";

const styles = StyleSheet.create({
  defaultText: {
    // fontFamily: "DMSans",
    fontSize: Fonts.size.medium,
  },
  buttonText: {
    fontSize: Fonts.size.normal,
  },
  headerTitle: {
    // fontFamily: "DMSans",
    fontSize: Fonts.size.large,
    textAlign: "center",
  },
});

const ButtonText = ({ value, style, isBold }) => {
  return (
    <Text
      style={[
        styles.buttonText,
        { fontWeight: isBold ? "bold" : "normal" },
        style,
      ]}
      allowFontScaling={false}
    >
      {value}
    </Text>
  );
};

const DefaultText = ({ value, style, isBold }) => {
  return (
    <Text
      style={[
        styles.defaultText,
        { fontWeight: isBold ? "bold" : "normal" },
        style,
      ]}
      allowFontScaling={false}
    >
      {value}
    </Text>
  );
};

const HeaderTitleText = ({ value, style, isBold }) => {
  return (
    <Text
      style={[
        styles.headerTitle,
        { fontWeight: isBold ? "bold" : "normal" },
        style,
      ]}
      allowFontScaling={false}
    >
      {value}
    </Text>
  );
};

const Custom_Text = ({ type, value, style, isBold }) => {
  if (type === "button") {
    return <ButtonText {...{ value, style, isBold }} />;
  } else if (type === "header") {
    return <HeaderTitleText {...{ value, style, isBold }} />;
  }

  return <DefaultText {...{ value, style, isBold }} />;
};

export default Custom_Text;
