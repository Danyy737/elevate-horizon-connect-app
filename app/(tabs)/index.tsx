import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { fetchEvents } from '@/src/data/eventsApi';
import { useSettings } from './settingscontext';

export default function HomeScreen() {
  const { darkMode, fontSize } = useSettings();

  const [events, setEvents] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchText.toLowerCase()) ||
      event.location.toLowerCase().includes(searchText.toLowerCase()) ||
      event.category.toLowerCase().includes(searchText.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedFilter === 'Today') return event.date === today;
    if (selectedFilter === 'All') return true;

    return event.category === selectedFilter;
  });

const visibleEvents = filteredEvents;

  if (loading) {
    return (
      <View style={[styles.centered, darkMode && styles.darkContainer]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkContainer]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
  <Image
    source={require('../../assets/images/logo.jpg')}
    style={styles.logo}
    resizeMode="contain"
  />
</View>

      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Text style={[styles.title, darkMode && styles.darkText, { fontSize: fontSize + 8 }]}>
          Welcome
        </Text>

        <Text style={[styles.subtitle, darkMode && styles.darkText, { fontSize }]}>
          Find and register for community events
        </Text>

        <Link href="/events" asChild>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={[styles.outlineButtonText, darkMode && styles.darkText]}>
              View All Events
            </Text>
          </TouchableOpacity>
        </Link>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search Events..."
        placeholderTextColor="#777"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.chipRow}>
        {['All', 'Today', 'Fitness', 'Music', 'Social', 'Outdoor'].map((chip) => (
          <TouchableOpacity
            key={chip}
            style={[styles.chip, selectedFilter === chip && styles.activeChip]}
            onPress={() => setSelectedFilter(chip)}
          >
            <Text style={selectedFilter === chip ? styles.activeChipText : styles.chipText}>
              {chip}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.results, darkMode && styles.darkText]}>
        Showing: {selectedFilter} • {visibleEvents.length} results
      </Text>

      {visibleEvents.length === 0 ? (
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>No events found</Text>
          <Text style={styles.eventMeta}>Try another filter or search term.</Text>
        </View>
      ) : (
        visibleEvents.map((event) => (
          <Link key={event.id} href={`/event-details?id=${event.id}`} asChild>
            <TouchableOpacity style={styles.eventCard}>
              <Text style={[styles.eventTitle, { fontSize }]}>{event.title}</Text>
              <Text style={styles.eventMeta}>
                ⏰ {event.startTime}–{event.endTime}   📍 {event.location}
              </Text>
              <Text style={styles.spots}>Spots remaining: {event.spotsRemaining}</Text>

              <View style={styles.chipRowSmall}>
                <View style={styles.chipSmall}>
                  <Text style={styles.chipText}>{event.category}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#2F86B7' },
  darkContainer: { backgroundColor: '#1E1E1E' },
  content: { padding: 20, paddingBottom: 40 },
  centered: { flex: 1, backgroundColor: '#2F86B7', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#FFFFFF', marginTop: 12, fontSize: 18, fontWeight: '700' },
  header: { marginTop: 30, marginBottom: 20, alignItems: 'center' },
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
  darkCard: { backgroundColor: '#2B2B2B' },
  darkText: { color: '#FFFFFF' },
  title: { fontSize: 26, fontWeight: '700', color: '#424754', marginBottom: 18 },
  subtitle: { fontSize: 16, color: '#424754', marginBottom: 18 },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#424754',
    padding: 14,
    alignSelf: 'flex-start',
  },
  outlineButtonText: { color: '#424754', fontSize: 15 },
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
  activeChip: { backgroundColor: '#3CA6E5' },
  chipText: { color: '#424754' },
  activeChipText: { color: '#FFFFFF', fontWeight: '700' },
  results: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 12,
    fontSize: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  eventTitle: {
    color: '#424754',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
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

  logo: {
  width: 260,
  height: 100,
  alignSelf: 'center',
},
});