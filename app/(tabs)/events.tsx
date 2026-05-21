import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
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

export default function EventsScreen() {
  const { darkMode, fontSize } = useSettings();

  const [events, setEvents] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadEvents() {
    try {
      setLoading(true);
      setError('');
      const data = await fetchEvents();
      setEvents(data);
    } catch {
      setError('Unable to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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

  if (loading) {
    return (
      <View style={[styles.centered, darkMode && styles.darkContainer]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={[styles.loadingText, { fontSize }]}>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, darkMode && styles.darkContainer]}>
        <Text style={[styles.errorText, { fontSize }]}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadEvents}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkContainer]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.heading, { fontSize: fontSize + 11 }]}>All Events</Text>

      <TextInput
        style={styles.search}
        placeholder="Search by keyword..."
        placeholderTextColor="#777"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.filterRow}>
        {['All', 'Today', 'Fitness', 'Social', 'Music', 'Outdoors'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.chip, selectedFilter === filter && styles.activeChip]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={selectedFilter === filter ? styles.activeChipText : styles.chipText}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.results}>
        Showing {filteredEvents.length} {selectedFilter} events
      </Text>

      {filteredEvents.length === 0 ? (
        <View style={styles.eventCard}>
          <Text style={styles.emptyText}>No events match this filter.</Text>
        </View>
      ) : (
        filteredEvents.map((event) => (
          <Link key={event.id} href={`/event-details?id=${event.id}`} asChild>
            <TouchableOpacity style={styles.eventCard}>
              <Text style={[styles.eventTitle, { fontSize: fontSize + 1 }]}>
                {event.title}
              </Text>

              <Text style={styles.meta}>
                📅 {event.date}   ⏰ {event.startTime}–{event.endTime}
              </Text>

              <Text style={styles.meta}>📍 {event.location}</Text>

              <Text style={styles.spots}>
                Spots remaining: {event.spotsRemaining}
              </Text>

              <View style={styles.tag}>
                <Text style={styles.tagText}>{event.category}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))
      )}
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
  centered: {
    flex: 1,
    backgroundColor: '#2F86B7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  search: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  chip: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  activeChip: {
    backgroundColor: '#3CA6E5',
  },
  chipText: {
    color: '#424754',
  },
  activeChipText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  results: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  eventTitle: {
    color: '#424754',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 6,
  },
  meta: {
    color: '#424754',
    marginBottom: 4,
  },
  spots: {
    color: '#424754',
    marginTop: 4,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#DDAB5E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: '#424754',
    fontWeight: '700',
  },
  emptyText: {
    color: '#424754',
    fontWeight: '700',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '700',
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryText: {
    color: '#424754',
    fontWeight: '700',
  },
});