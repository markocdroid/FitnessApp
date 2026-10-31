import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import TopNavBar from '../components/TopNavBar';
import { selectIsFavorite, toggleFavorite } from '../store/favoritesSlice';
import { detailStyles as styles } from '../styles/detailStyles';

const TABS = ['About', 'Instructions'];

export default function ExerciseDetailScreen({ route }) {
  const { item } = route.params;
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(item.id));
  const [activeTab, setActiveTab] = useState('Instructions');

  const onToggleFavorite = () => dispatch(toggleFavorite(item));
  const instructions = item.instructions ?? [];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TopNavBar title="" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>
          {item.tag} / 🕙 {item.duration}
        </Text>

        <View style={styles.tabs}>
          {TABS.map((tab) => {
            const active = tab === activeTab;
            return (
              <Pressable
                key={tab}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, active && styles.tabActive]}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.section}>
          {activeTab === 'About' ? (
            <>
              <Text style={styles.sectionTitle}>About :</Text>
              <Text style={styles.bodyText}>{item.description}</Text>
            </>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Instructions :</Text>
              {instructions.length === 0 ? (
                <Text style={styles.bodyText}>No instructions available yet.</Text>
              ) : (
                instructions.map((step) => (
                  <Text key={step} style={styles.bodyText}>
                    • {step}
                  </Text>
                ))
              )}
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onPress={onToggleFavorite}
          style={styles.heartButton}
        >
          <Image
            source={
              isFavorite
                ? require('../../assets/heart-filled.png')
                : require('../../assets/heart.png')
            }
            style={styles.heartIcon}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable accessibilityRole="button" onPress={onToggleFavorite} style={styles.favoriteButton}>
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
