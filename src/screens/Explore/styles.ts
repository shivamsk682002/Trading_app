import { StyleSheet } from 'react-native';
import { horizontalScale,moderateScale,verticalScale } from '../../utils/scale';
import colors from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: horizontalScale(16),
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    gap: horizontalScale(8),
    alignItems: 'center',
  },
  logoWrapper: {
    padding: moderateScale(4),
    borderRadius: moderateScale(23),
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
  scrollContent: {
    padding: horizontalScale(16),
    paddingTop: verticalScale(8),
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: colors.black,
  },
  viewAll: {
    fontSize: moderateScale(14),
    color: colors.bluePrimary,
  },
  
  skeletonItem: {
    marginBottom: verticalScale(2),
    paddingLeft: horizontalScale(16),
  },
  skeletonLine: {
    height: verticalScale(270),
    borderRadius: moderateScale(4),
    width: '95%',
  },
  skeletonLine2: {
    height: verticalScale(270),
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(6),
    width: '95%',
  },
  skeletonLine3: {
    height: verticalScale(270),
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(6),
    width: '95%',
  },


});
