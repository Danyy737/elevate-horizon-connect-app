import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSettings } from './settingscontext';

const events = [
  {
    id: 1,
    title: 'Morning Yoga',
    time: '08:30–09:15',
    location: 'Community Hall',
    category: 'Fitness',
    spots: 5,
  },
  {
    id: 2,
    title: 'Trail Walk',
    time: '11:30–14:30',
    location: 'Forest Trails',
    category: 'Fitness',
    spots: 15,
  },
];

export default function HomeScreen() {
  const { darkMode, fontSize } = useSettings();

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkContainer]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.logoText}>Elevate Horizon Connect</Text>
      </View>

      <View style={[styles.topCard, darkMode && styles.darkCard]}>
        <Text style={[styles.title, darkMode && styles.darkText, { fontSize: fontSize + 8 }]}>
          Welcome
        </Text>

        <Text style={[styles.subtitle, darkMode && styles.darkText, { fontSize }]}>
          Find and register for community events
        </Text>

        <Link href="/events" asChild>
          <TouchableOpacity style={[styles.outlineButton, darkMode && styles.darkOutlineButton]}>
            <Text style={[styles.outlineButtonText, darkMode && styles.darkText]}>
              View Today’s Events
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search Events..."
        placeholderTextColor="#777"
      />

      <View style={styles.chipRow}>
        {['Athletics', 'Today', 'Fitness', 'Music', 'Social', 'Outdoors', 'Family'].map((chip) => (
          <View key={chip} style={[styles.chip, chip === 'Today' && styles.activeChip]}>
            <Text style={chip === 'Today' ? styles.activeChipText : styles.chipText}>
              {chip}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.resultsSection, darkMode && styles.darkCard]}>
        <Text style={[styles.results, darkMode && styles.darkText]}>
          Showing: Today • 2 results
        </Text>

        {events.map((event) => (
          <Link key={event.id} href={`/event-details?id=${event.id}`} asChild>
            <TouchableOpacity style={[styles.eventCard, darkMode && styles.darkEventCard]}>
              <Text style={[styles.eventTitle, darkMode && styles.darkText, { fontSize }]}>
                {event.title}
              </Text>

              <Text style={[styles.eventMeta, darkMode && styles.darkText]}>
                ⏰ {event.time}   📍 {event.location}
              </Text>

              <Text style={[styles.spots, darkMode && styles.darkText]}>
                Spots remaining: {event.spots}
              </Text>

              <View style={styles.chipRowSmall}>
                <View style={styles.chipSmall}>
                  <Text style={styles.chipText}>{event.category}</Text>
                </View>

                <View style={[styles.chipSmall, styles.activeChip]}>
                  <Text style={styles.activeChipText}>Today</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2F86B7',
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  logoText: {
    backgroundColor: '#3CA6E5',
    color: '#424754',
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 10,
    letterSpacing: 1,
  },
  topCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    elevation: 4,
  },
  resultsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    marginBottom: 20,
    elevation: 4,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 2,
  },
  darkCard: {
    backgroundColor: '#2B2B2B',
  },
  darkEventCard: {
    backgroundColor: '#3A3A3A',
    borderColor: '#555',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkOutlineButton: {
    borderColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#424754',
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 16,
    color: '#424754',
    marginBottom: 18,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#424754',
    padding: 14,
    alignSelf: 'flex-start',
  },
  outlineButtonText: {
    color: '#424754',
    fontSize: 15,
  },
  search: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
  },
  activeChip: {
    backgroundColor: '#3CA6E5',
  },
  chipText: {
    color: '#424754',
  },
  activeChipText: {
    color: '#424754',
  },
  results: {
    color: '#424754',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  eventTitle: {
    color: '#424754',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
  },
  eventMeta: {
    color: '#424754',
    fontWeight: '600',
    marginBottom: 6,
  },
  spots: {
    color: '#424754',
    fontSize: 12,
    marginBottom: 10,
  },
  chipRowSmall: {
    flexDirection: 'row',
    gap: 8,
  },
  chipSmall: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
  },
});