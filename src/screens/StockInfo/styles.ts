import { horizontalScale, verticalScale, moderateScale } from '../../utils/scale';
import colors from '../../utils/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  emptyContainer:{flex:1,alignItems: 'center', marginTop: verticalScale(200)},
    rowGap: {
    flexDirection: 'row',
    gap: horizontalScale(8),
  },
  scrollContent: {
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(12),
  },
  flex70: {
    flex: 0.7,
  },
  green: {
    color: colors.green,
  },
  red: {
    color: colors.red,
  },
  chart: {
    borderRadius: moderateScale(8),
  },
  loadingChart: {
    textAlign: 'center',
    padding: verticalScale(20),
  },

  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  stockName: {
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  stockMeta: {
    color: colors.darkGray,
    fontSize: moderateScale(12),
  },
  stockPrice: {
    fontWeight: 'bold',
    fontSize: moderateScale(12),
  },
  stockChange: {
    color: colors.green,
    fontSize: moderateScale(12),
  },
  errorText: {
    color: colors.gray,
    textAlign: 'center',
    fontSize: moderateScale(16),
    marginTop: verticalScale(40),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  graphBox: {
    height: verticalScale(200),
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: colors.white,
    marginVertical: verticalScale(16),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    paddingLeft: horizontalScale(-20),
  },
  card: {
    backgroundColor: colors.skeleton,
    padding: moderateScale(16),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: verticalScale(16),
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: moderateScale(14),
    marginBottom: verticalScale(12),
  },
  description: {
    fontSize: moderateScale(11),
    color: colors.gray,
    lineHeight: verticalScale(20),
    marginBottom: verticalScale(8),
  },
  readMore: {
    color: colors.blue,
    fontSize: moderateScale(12),
    fontWeight: '500',
    marginBottom: verticalScale(12),
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: horizontalScale(8),
  },
  tag: {
    backgroundColor: colors.brown,
    borderRadius: moderateScale(20),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    marginRight: horizontalScale(8),
    marginBottom: verticalScale(8),
  },
  tagText: {
    color: colors.textBrown,
    fontSize: moderateScale(8),
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(4),
  },
  label: {
    color: colors.emptyGray,
    fontSize: moderateScale(13),
  },
  value: {
    fontWeight: '600',
    fontSize: moderateScale(14),
  },
  barTrack: {
    height: verticalScale(8),
    backgroundColor: colors.lightGray,
    borderRadius: moderateScale(4),
    marginVertical: verticalScale(6),
    position: 'relative',
  },
  marker: {
    position: 'absolute',
    top: verticalScale(4),
    width: 0,
    height: 0,
    borderLeftWidth: horizontalScale(6),
    borderRightWidth: horizontalScale(6),
    borderBottomWidth: verticalScale(8),
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.lightGray,
  },
  statsGrid: {
    marginTop: verticalScale(12),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  statBlock: {
    width: '48%',
    marginVertical: verticalScale(6),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginBottom: verticalScale(12),
  },
  skeletonItem: {
    marginBottom: verticalScale(2),
    paddingLeft: horizontalScale(16),
    paddingTop: verticalScale(32),
  },
  skeletonLine: {
    height: verticalScale(120),
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(6),
    width: '95%',
  },
  skeletonLine2: {
    height: verticalScale(220),
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(6),
    width: '95%',
  },
  skeletonLine3: {
    height: verticalScale(220),
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(6),
    width: '95%',
  },
   handle: {
    backgroundColor: '#ccc',
    width: horizontalScale(60),
    height: verticalScale(5),
    borderRadius: moderateScale(3),
    alignSelf: 'center',
    marginVertical: verticalScale(8),
  },
  modal: {
    padding: moderateScale(20),
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
  },
  container2: {
    paddingTop: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(12),
  },
  tab: {
    paddingVertical: verticalScale(12),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  tabText: {
    fontSize: moderateScale(16),
  },
 fab: {
  position: 'absolute',
  bottom: verticalScale(20),
  right: horizontalScale(20),
  backgroundColor: 'transparent',
},

modalOverlay: {
  flex: 1,
  backgroundColor: colors.overlay,
  justifyContent: 'center',
  alignItems: 'center',
},

modalContainer: {
  backgroundColor: '#fff',
  padding: moderateScale(20),
  borderRadius: 10,
  width: '80%',
},

modalTitle: {
  fontSize: moderateScale(18),
  fontWeight: 'bold',
  marginBottom: 12,
},

input: {
  borderWidth: horizontalScale(1),
  borderColor: colors.input,
  borderRadius: moderateScale(8),
  padding: moderateScale(10),
  marginBottom: horizontalScale(12),
},

modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

cancelButton: {
  color: colors.emptyGray,
  fontSize: moderateScale(16),
},

createButton: {
  color: colors.bluePrimary,
  fontWeight: 'bold',
  fontSize: moderateScale(16),
},
fabContainer: {
  position: 'absolute',
  bottom: verticalScale(16), 
  right: horizontalScale(16),  
  zIndex: 10,
},



sheetContainer: {
  flex: 1,
  position: 'relative',
},

fabButton: {
  position: 'absolute',
  bottom: verticalScale(16),
  right: horizontalScale(2),
  zIndex: 10,
  backgroundColor: 'white',
  borderRadius: 24,
  elevation: 4, 
  shadowColor: colors.shadow,
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
},



});
