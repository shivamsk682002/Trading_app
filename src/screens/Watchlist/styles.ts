import { horizontalScale, verticalScale, moderateScale } from '../../utils/scale';
import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  emptyContainer:{flex:1,alignItems: 'center', marginTop: 50},
  fixedHeader: {
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
    elevation: 2,
  },
  headerText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: horizontalScale(20),
    bottom: verticalScale(30),
    backgroundColor: colors.white,
    borderRadius: moderateScale(100),
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlay,
  },
  modalContainer: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    elevation: 6,
  },
  modalTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(12),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.input,
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    marginBottom: verticalScale(16),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: horizontalScale(20),
  },
  cancelButton: {
    fontSize: moderateScale(14),
    color: colors.emptyGray,
  },
  createButton: {
    fontSize: moderateScale(14),
    color: colors.bluePrimary,
    fontWeight: 'bold',
  },
  watchlistItem: {
    backgroundColor: colors.backgroundGray,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    marginBottom: verticalScale(10),
  },
  watchlistName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  stockCount: {
    fontSize: moderateScale(12),
    color: colors.darkGray,
  },
  spacer: {
    marginBottom: verticalScale(2),
    paddingLeft: horizontalScale(16),
  },
  skeletonItem: {
  
  marginBottom: verticalScale(2),
  paddingLeft:horizontalScale(16)
},
  skeletonLine: {
    height: verticalScale(60),
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(6),
    width: '95%',
  },
});
