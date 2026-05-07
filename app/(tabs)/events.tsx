import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { events } from '@/src/data/events';

export default function EventsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>All Events</Text>

      <TextInput style={styles.search} placeholder="Search by keyword..." />

      <View style={styles.filterRow}>
        {['All', 'Today', 'Fitness', 'Social', 'Music', 'Outdoors'].map((filter) => (
          <View key={filter} style={[styles.chip, filter === 'All' && styles.activeChip]}>
            <Text style={filter === 'All' ? styles.activeChipText : styles.chipText}>{filter}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.clearButton}>
        <Text style={styles.clearText}>Clear filters</Text>
      </TouchableOpacity>

      <Text style={styles.results}>Showing {events.length} events</Text>

      {events.map((event) => (
        <Link key={event.id} href={`/event-details?id=${event.id}`} asChild>
          <TouchableOpacity style={styles.eventCard}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.meta}>📅 {event.date}   ⏰ {event.startTime}–{event.endTime}</Text>
            <Text style={styles.meta}>📍 {event.location}</Text>
            <Text style={styles.spots}>Spots remaining: {event.spotsRemaining}</Text>

            <View style={styles.tag}>
              <Text style={styles.tagText}>{event.category}</Text>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#2F86B7' },
  content: { padding: 20, paddingBottom: 40 },
  heading: { marginTop: 40, marginBottom: 20, fontSize: 28, fontWeight: '700', color: '#FFFFFF' },
  search: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 14, fontSize: 16, marginBottom: 12 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { backgroundColor: '#F5F5F5', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14 },
  activeChip: { backgroundColor: '#3CA6E5' },
  chipText: { color: '#424754' },
  activeChipText: { color: '#FFFFFF', fontWeight: '700' },
  clearButton: { backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 18 },
  clearText: { color: '#424754', fontWeight: '700' },
  results: { color: '#FFFFFF', fontWeight: '700', marginBottom: 12 },
  eventCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, marginBottom: 12, elevation: 4 },
  eventTitle: { fontWeight: '700', fontSize: 18, color: '#424754', marginBottom: 6 },
  meta: { color: '#424754', marginBottom: 4 },
  spots: { color: '#424754', marginTop: 4, marginBottom: 10 },
  tag: { backgroundColor: '#DDAB5E', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, alignSelf: 'flex-start' },
  tagText: { color: '#424754', fontWeight: '700' },
});