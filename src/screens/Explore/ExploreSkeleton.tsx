import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../utils/colors';
import { styles } from './styles';

export const ExploreSkeleton = () => {
  return (
    <SafeAreaView>
    <SkeletonPlaceholder  backgroundColor="#e0e0e0"      
  highlightColor={colors.skeleton}>
      
        <View style={styles.skeletonItem}>
          <View style={styles.skeletonLine2} />
          <View style={[styles.skeletonLine2, { width: '60%' }]} />
          <View style={[styles.skeletonLine2, { width: '40%' }]} />
          <View style={styles.skeletonLine3} />
          <View style={[styles.skeletonLine3, { width: '60%' }]} />
          <View style={[styles.skeletonLine3, { width: '40%' }]} />
        </View>
      
    </SkeletonPlaceholder>
    </SafeAreaView>
  );
};

