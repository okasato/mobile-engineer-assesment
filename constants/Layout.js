import { Platform, Dimensions, PixelRatio } from "react-native";

export const isIos = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;
export const headerHeight = isAndroid
  ? (screenHeight / 100) * 6
  : (screenHeight / 100) * 8;

export default {
  screenWidth,
  screenHeight,
  headerHeight,
};
