import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { events } from '@/src/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const event = events.find((item) => item.id === id) ?? events[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href="/events" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>← Back to Events</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.tag}>
          <Text style={styles.tagText}>{event.category}</Text>
        </View>

        <Text style={styles.meta}>📅 Date: {event.date}</Text>
        <Text style={styles.meta}>⏰ Time: {event.startTime}–{event.endTime}</Text>
        <Text style={styles.meta}>📍 Location: {event.location}</Text>
        <Text style={styles.meta}>👥 Capacity: {event.capacity}</Text>
        <Text style={styles.meta}>✅ Spots remaining: {event.spotsRemaining}</Text>

        <Text style={styles.sectionTitle}>About this event</Text>
        <Text style={styles.description}>{event.description}</Text>

        <Link href={`/register?id=${event.id}`} asChild>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Register for Event</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#2F86B7' },
  content: { padding: 20, paddingBottom: 40 },
  backButton: { marginTop: 40, marginBottom: 16 },
  backText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 18, elevation: 4 },
  title: { fontSize: 28, fontWeight: '700', color: '#424754', marginBottom: 12 },
  tag: { backgroundColor: '#DDAB5E', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 16 },
  tagText: { color: '#424754', fontWeight: '700' },
  meta: { color: '#424754', fontSize: 16, marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#424754', marginTop: 12, marginBottom: 8 },
  description: { color: '#424754', fontSize: 16, lineHeight: 22, marginBottom: 20 },
  registerButton: { backgroundColor: '#3CA6E5', padding: 16, borderRadius: 10, alignItems: 'center' },
  registerText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});