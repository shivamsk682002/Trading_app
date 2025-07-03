import { StyleSheet } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '../../utils/scale';
import colors from '../../utils/colors';

export const styles = StyleSheet.create({
 safeArea: {
    flex: 1,
    backgroundColor:colors.white,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  backButton: {
    padding: moderateScale(16),
    paddingRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputWrapper: {
    flex: 1,
  },
  searchInput: {
    height: verticalScale(48),
    backgroundColor:colors.newGray,
    borderRadius: moderateScale(8),
    margin: moderateScale(16),
    paddingHorizontal: horizontalScale(16),
    fontSize: moderateScale(16),
    color: colors.gray,
  },
  list: {
    paddingHorizontal: horizontalScale(16),
  },
  itemContainer: {
    padding: moderateScale(12),
    borderBottomWidth: 1,
    borderColor: colors.borderGray,
  },
  symbol: {
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    color: colors.black,
  },
  name: {
    fontSize: moderateScale(14),
    color: colors.gray,
  },
  type: {
    fontSize: moderateScale(12),
    color: colors.darkGray,
    marginTop: verticalScale(4),
  },
  emptyState: {
    marginTop: verticalScale(40),
    alignItems: 'center',
  },
  emptyText: {
    color: colors.emptyGray,
    fontSize: moderateScale(16),
  },
  skeletonItem: {
  
  marginBottom: verticalScale(2),
  paddingLeft:horizontalScale(16)
},
skeletonLine: {
  height: verticalScale(80),
  borderRadius: moderateScale(4),
  marginBottom: verticalScale(6),
  width: '95%',
},
});
