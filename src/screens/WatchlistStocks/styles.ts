import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/scale";
import colors from "../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor:colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  headerText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  scroll: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
  },
  stockCard: {
    backgroundColor: colors.backgroundGray,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    marginBottom: verticalScale(10),
  },
  stockName: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  stockMeta: {
    fontSize: moderateScale(13),
    color: colors.darkGray,
    marginTop: verticalScale(2),
  },
  empty: {
    marginTop: verticalScale(40),
    textAlign: 'center',
    color: colors.emptyGray,
  },
  stockInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
