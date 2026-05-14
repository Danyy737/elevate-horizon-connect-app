import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchEvents } from '@/src/data/eventsApi';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const events = await fetchEvents();
        const selectedEvent = events.find((item: any) => String(item.id) === String(id));
        setEvent(selectedEvent ?? null);
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Loading event...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Event not found.</Text>
        <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/events')}>
          <Text style={styles.registerText}>Back to Events</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/events')}>
        <Text style={styles.backText}>← Back to Events</Text>
      </TouchableOpacity>

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

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() =>
            router.push({
              pathname: '/register',
              params: {
                eventId: String(event.id),
                eventTitle: event.title,
              },
            })
          }
        >
          <Text style={styles.registerText}>Register for Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#2F86B7' },
  content: { padding: 20, paddingBottom: 40 },
  centered: { flex: 1, backgroundColor: '#2F86B7', justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginBottom: 16 },
  backButton: { marginTop: 40, marginBottom: 16 },
  backText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 18, elevation: 4 },
  title: { fontSize: 28, fontWeight: '700', color: '#424754', marginBottom: 12 },
  tag: { backgroundColor: '#DDAB5E', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 16 },
  tagText: { color: '#424754', fontWeight: '700' },
  meta: { color: '#424754', fontSize: 16, marginBottom: 10 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#424754', marginTop: 12, marginBottom: 8 },
  description: { color: '#424754', fontSize: 16, lineHeight: 22, marginBottom: 20 },
  registerButton: { backgroundColor: '#3CA6E5', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  registerText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});