import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


export const SearchSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      {[...Array(6)].map((_, index) => (
        <View key={index} style={styles.skeletonItem}>
          <View style={styles.skeletonLine} />
          <View style={[styles.skeletonLine, { width: '60%' }]} />
          <View style={[styles.skeletonLine, { width: '40%' }]} />
        </View>
      ))}
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({skeletonItem: {
  marginBottom: 2,
  paddingLeft:16
},
skeletonLine: {
  height: 80,
  borderRadius: 4,
  marginBottom: 6,
  width: '90%',
},
})