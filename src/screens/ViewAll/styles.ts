import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/scale';
import colors from '../../utils/colors';

export const styles = StyleSheet.create({
    skeletonItem: {
  marginBottom: verticalScale(2),
  paddingLeft:horizontalScale(16)
},
skeletonLine: {
  height: verticalScale(800),
  borderRadius: 4,
  marginBottom: verticalScale(6),
  width: '95%',
},
  container: {
    flex: 1,
    padding: horizontalScale(16),
    paddingTop: 0,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginBottom: verticalScale(16),
    color: colors.black,
  },
  list: {
    paddingBottom: verticalScale(16),
    justifyContent: 'space-around',
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: verticalScale(12),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(8),
  },
  logoWrapper: {
    padding: moderateScale(4),
    borderRadius: moderateScale(24),
    borderWidth: 2,
    borderColor: colors.green, 
    backgroundColor: colors.white,
  },
  logoImage: {
    height: verticalScale(30),
    width: horizontalScale(30),
    borderRadius: moderateScale(15),
  },
  logoText: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: colors.black,
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
});
