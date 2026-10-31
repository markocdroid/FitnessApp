import { ActivityIndicator, Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchQuotes } from '../api/quotes';
import TopNavBar from '../components/TopNavBar';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { getDailyCompletions, saveDailyCompletions, saveUserAction } from '../storage/localStorage';
import { homeStyles } from '../styles/homeStyles';

const DEADLIFT_INSTRUCTIONS = [
  'Stand with feet hip-width apart, barbell over mid-foot.',
  'Hinge at the hips and grip the bar just outside your knees.',
  'Brace your core and drive through your heels to stand.',
  'Keep the bar close to your body throughout the lift.',
  'Lower with control for 3 sets of 8 reps, rest 90 seconds.',
];

// Royalty-free stock photos from Unsplash (https://unsplash.com/license).
const POPULAR_WORKOUTS = [
  {
    id: 'barbell-deadlift',
    title: 'Barbell Deadlift',
    instructions: DEADLIFT_INSTRUCTIONS,
    tag: 'strength',
    description: 'Build raw pulling power with proper hip-hinge form and progressive overload.',
    duration: '12 minutes',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'dumbbell-circuit',
    title: 'Dumbbell Circuit',
    tag: 'endurance',
    description:
      'Cycle through compound moves with minimal rest to torch calories and build lean muscle.',
    duration: '20 minutes',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'bench-press',
    title: 'Bench Press',
    tag: 'power',
    description: 'Drive through your chest, shoulders, and triceps to build serious pressing strength.',
    duration: '15 minutes',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'kettlebell-flow',
    title: 'Kettlebell Flow',
    tag: 'strength',
    description: 'Link swings, cleans, and squats into a smooth full-body strength session.',
    duration: '18 minutes',
    image:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'hiit-sprint',
    title: 'HIIT Sprint',
    tag: 'cardio',
    description: 'Alternate fast bursts with short recovery periods to raise your heart rate quickly.',
    duration: '10 minutes',
    image:
      'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'morning-yoga',
    title: 'Morning Yoga',
    tag: 'mobility',
    description: 'Wake up your hips, spine, and shoulders with a calm, energizing flow.',
    duration: '15 minutes',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'rowing-intervals',
    title: 'Rowing Intervals',
    tag: 'endurance',
    description: 'Build steady-state stamina and powerful posterior-chain drive on the rower.',
    duration: '22 minutes',
    image:
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'core-stability',
    title: 'Core Stability',
    tag: 'core',
    description: 'Strengthen your midline with controlled anti-rotation and balance exercises.',
    duration: '14 minutes',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'lower-body-burn',
    title: 'Lower Body Burn',
    tag: 'strength',
    description: 'Challenge your glutes, quads, and hamstrings with focused lower-body work.',
    duration: '16 minutes',
    image:
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'dance-cardio',
    title: 'Dance Cardio',
    tag: 'cardio',
    description: 'Keep moving through upbeat combinations that make cardio feel like play.',
    duration: '25 minutes',
    image:
      'https://images.unsplash.com/photo-1517964603305-11c0f6f66012?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'post-workout-stretch',
    title: 'Post-Workout Stretch',
    tag: 'recovery',
    description: 'Ease tight muscles and restore comfortable range of motion after training.',
    duration: '12 minutes',
    image:
      'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'pull-up-power',
    title: 'Pull-Up Power',
    tag: 'strength',
    description: 'Build back, grip, and arm strength with controlled vertical pulling work.',
    duration: '14 minutes',
    image:
      'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'box-jump-intervals',
    title: 'Box Jump Intervals',
    tag: 'power',
    description: 'Train explosive lower-body power with crisp jumps and purposeful recovery.',
    duration: '11 minutes',
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=70',
  },
  {
    id: 'pilates-core',
    title: 'Pilates Core',
    tag: 'core',
    description: 'Activate deep abdominal muscles through precise, low-impact movement.',
    duration: '16 minutes',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=70',
  },
];

const DAILY_WORKOUT = {
  id: 'daily-barbell-deadlift',
  title: 'Barbell Deadlift',
  instructions: DEADLIFT_INSTRUCTIONS,
  tag: 'strength',
  description: 'Build raw pulling power with proper hip-hinge form and progressive overload.',
  duration: '12 minutes',
  image:
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=70',
};

const DAILY_WORKOUTS = [DAILY_WORKOUT, ...POPULAR_WORKOUTS.slice(1, 6)];

export default function HomeScreen({ navigation }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => homeStyles(colors), [colors]);
  const { user } = useAuth();
  const displayName = user?.username || user?.email?.split('@')[0] || 'user';
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [quote, setQuote] = useState(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchQuotes()
      .then(([daily]) => {
        if (isMounted) setQuote(daily);
      })
      .catch(() => {
        // Offline or rate limited: the box falls back to the built-in quote.
      })
      .finally(() => {
        if (isMounted) setIsQuoteLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    getDailyCompletions().then((stored) => {
      if (isMounted) setCompletedWorkouts(stored);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleWorkoutCompletion = async (workout) => {
    const isCompleted = !completedWorkouts[workout.id];
    const nextCompletedWorkouts = { ...completedWorkouts, [workout.id]: isCompleted };

    setCompletedWorkouts(nextCompletedWorkouts);
    await saveDailyCompletions(nextCompletedWorkouts);
    await saveUserAction({
      type: isCompleted ? 'completed' : 'uncompleted',
      workoutId: workout.id,
      label: workout.title,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TopNavBar title="Home" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={true}>
        <Text style={styles.greeting}>Hello {displayName}!</Text>
        <Text style={styles.pageTitle}>Find your perfect workout</Text>

        <View style={styles.quoteBox}>
          {isQuoteLoading ? (
            <ActivityIndicator color={colors.accent} />
          ) : (
            <>
              <Text style={styles.quoteText}>
                "{quote ? quote.text : "The Only Bad Workout Is The One That Didn't Happen."}"
              </Text>
              {quote?.author ? <Text style={styles.quoteAuthor}>— {quote.author}</Text> : null}
              <Text
                style={styles.quoteAttribution}
                onPress={() => Linking.openURL('https://zenquotes.io/')}
              >
                Inspirational quotes provided by ZenQuotes API
              </Text>
            </>
          )}
        </View>

        <Text style={styles.sectionTitle}>Popular Workouts</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.popularList}
        >
          {POPULAR_WORKOUTS.map((workout) => (
            <Pressable
              key={workout.id}
              accessibilityRole="button"
              onPress={() => navigation.navigate('Detail', { item: workout })}
              style={styles.workoutCard}
            >
              <Image source={{ uri: workout.image }} style={styles.workoutImage} resizeMode="cover" />
              <View style={styles.tagPill}>
                <Text style={styles.tagText}>{workout.tag}</Text>
              </View>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <Text style={styles.workoutDescription}>{workout.description}</Text>
              <Text style={styles.workoutDuration}>{workout.duration}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Daily Workout</Text>
        {DAILY_WORKOUTS.map((workout) => (
          <View key={workout.id} style={styles.dailyCard}>
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.navigate('Detail', { item: workout })}
            >
              <Image source={{ uri: workout.image }} style={styles.dailyImage} resizeMode="cover" />
            </Pressable>
            <View style={styles.dailyInfo}>
              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.navigate('Detail', { item: workout })}
              >
                <Text style={styles.dailyTitle}>{workout.title}</Text>
                <Text style={styles.dailyTag}>{workout.tag}</Text>
                <Text style={styles.dailyDuration}>{workout.duration}</Text>
              </Pressable>
              <Pressable
                accessibilityLabel={`Mark ${workout.title} as completed`}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: !!completedWorkouts[workout.id] }}
                onPress={() => toggleWorkoutCompletion(workout)}
                style={({ pressed }) => [
                  styles.completionControl,
                  pressed && styles.completionControlPressed,
                ]}
              >
                <Text style={styles.completionLabel}>Completed</Text>
                <View
                  style={[
                    styles.completionCheckbox,
                    completedWorkouts[workout.id] && styles.completionCheckboxSelected,
                  ]}
                >
                  {completedWorkouts[workout.id] && (
                    <Text style={styles.completionMark}>✓</Text>
                  )}
                </View>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
