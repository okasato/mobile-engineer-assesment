import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import { Layout } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0080FF",
    flexDirection: "row",
    height: Layout.headerHeight,
    marginTop: Constants.statusBarHeight,
  },
  left: {
    flex: 2.25,
    alignItems: "flex-start",
  },
  center: {
    flex: 7.5,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 2.25,
    alignItems: "flex-end",
  },
});

const Custom_Header = ({ leftComponent, centerComponent, rightComponent }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {leftComponent ? leftComponent : <View />}
      </View>
      <View style={styles.center}>
        {centerComponent ? centerComponent : <View />}
      </View>
      <View style={styles.right}>
        {rightComponent ? rightComponent : <View />}
      </View>
    </View>
  );
};

export default Custom_Header;
