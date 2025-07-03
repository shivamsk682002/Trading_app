import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { styles } from './styles';


export const WatchlistSkeleton = () => {
  return (
    <SkeletonPlaceholder  backgroundColor="#e0e0e0"      
  highlightColor="#f5f5f5">
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

