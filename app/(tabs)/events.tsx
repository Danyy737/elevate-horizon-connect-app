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

function isEventHappeningToday(event: any) {
  const today = new Date();

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  );

  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59
  );

  const eventStart = new Date(`${event.date}T${event.startTime}`);
  const eventEnd = new Date(`${event.date}T${event.endTime}`);

  return eventStart <= endOfToday && eventEnd >= startOfToday;
}

export default function EventsScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadEvents() {
    try {
      setLoading(true);
      setError('');

      const data: any = await fetchEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchText.toLowerCase()) ||
      event.location.toLowerCase().includes(searchText.toLowerCase()) ||
      event.category.toLowerCase().includes(searchText.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (selectedFilter === 'Today') {
      return isEventHappeningToday(event);
    }

    if (selectedFilter === 'All') {
      return true;
    }

    return event.category === selectedFilter;
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>

        <TouchableOpacity style={styles.retryButton} onPress={loadEvents}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>All Events</Text>

      <TextInput
        style={styles.search}
        placeholder="Search by keyword..."
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
        Showing {filteredEvents.length} {selectedFilter === 'Today' ? 'today/current' : selectedFilter} events
      </Text>

      {filteredEvents.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No events match this filter.</Text>
        </View>
      ) : (
        filteredEvents.map((event) => (
          <Link key={event.id} href={`/event-details?id=${event.id}`} asChild>
            <TouchableOpacity style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>

              <Text style={styles.meta}>
                📅 {event.date}   ⏰ {event.startTime}–{event.endTime}
              </Text>

              <Text style={styles.meta}>📍 {event.location}</Text>

              <Text style={styles.spots}>Spots remaining: {event.spotsRemaining}</Text>

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
    marginBottom: 12,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },

  emptyText: {
    color: '#424754',
    fontWeight: '700',
  },

  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 4,
  },

  eventTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#424754',
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
});