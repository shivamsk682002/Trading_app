import { StyleSheet } from "react-native";
import { horizontalScale,verticalScale,moderateScale } from "../utils/scale";
import colors from "../utils/colors";

export const styles = StyleSheet.create({
  card: {
    width:horizontalScale(140),
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    backgroundColor: colors.white,
    marginRight: horizontalScale(12),
   shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 3,
    marginVertical: verticalScale(4),
  },
  ticker: { fontSize: moderateScale(16), fontWeight: '600' },
  price: { fontSize: moderateScale(14), marginVertical: verticalScale(4) },
  change: { fontSize: moderateScale(12) },
  plus: { color: colors.green },
  minus: { color: colors.red },
  volume: { fontSize: moderateScale(10), color: '#666', marginTop: verticalScale(4), },
});