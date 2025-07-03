import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../../utils/colors';
import { styles } from './styles';


export const ViewAllSkelton = () => {
  return (
    <SkeletonPlaceholder  backgroundColor="#e0e0e0"      
  highlightColor={colors.skeleton}>
        <View style={styles.skeletonItem}>
          <View style={styles.skeletonLine} />
          <View style={[styles.skeletonLine, { width: '60%' }]} />
          <View style={[styles.skeletonLine, { width: '40%' }]} />
        </View>
    </SkeletonPlaceholder>
  );
};

