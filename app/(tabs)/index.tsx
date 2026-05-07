import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.logoText}>Elevate Horizon Connect</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Find and register for community events</Text>

        <Link href="/events" asChild>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>View Today’s Events</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <TextInput style={styles.search} placeholder="Search Events..." />

      <View style={styles.chipRow}>
        {['Athletics', 'Today', 'Fitness', 'Music', 'Social', 'Outdoors', 'Family'].map((chip) => (
          <View key={chip} style={[styles.chip, chip === 'Today' && styles.activeChip]}>
            <Text style={chip === 'Today' ? styles.activeChipText : styles.chipText}>{chip}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.results}>Showing: Today • 2 results</Text>

      {events.map((event) => (
       <Link key={event.id} href={`/event-details?id=${event.id}`} asChild>
          <TouchableOpacity style={styles.eventCard}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventMeta}>⏰ {event.time}   📍 {event.location}</Text>
            <Text style={styles.spots}>Spots remaining: {event.spots}</Text>

            <View style={styles.chipRowSmall}>
              <View style={styles.chipSmall}>
                <Text>{event.category}</Text>
              </View>
              <View style={[styles.chipSmall, styles.activeChip]}>
                <Text style={styles.activeChipText}>Today</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2F86B7',
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    elevation: 4,
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
    marginBottom: 12,
    fontSize: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 4,
  },
  eventTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  eventMeta: {
    fontWeight: '600',
    marginBottom: 6,
  },
  spots: {
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