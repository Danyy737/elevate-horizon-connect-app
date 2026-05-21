import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { fetchEvents } from '@/src/data/eventsApi';
import { useSettings } from './settingscontext';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { darkMode, fontSize } = useSettings();

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
      <View style={[styles.centered, darkMode && styles.darkContainer]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={[styles.loadingText, { fontSize }]}>Loading event...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={[styles.centered, darkMode && styles.darkContainer]}>
        <Text style={[styles.loadingText, { fontSize }]}>Event not found.</Text>
        <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/events')}>
          <Text style={styles.registerText}>Back to Events</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkContainer]}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/events')}>
        <Text style={styles.backText}>← Back to Events</Text>
      </TouchableOpacity>

      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Text style={[styles.title, darkMode && styles.darkText, { fontSize: fontSize + 10 }]}>
          {event.title}
        </Text>

        <View style={styles.tag}>
          <Text style={styles.tagText}>{event.category}</Text>
        </View>

        <Text style={[styles.meta, darkMode && styles.darkText, { fontSize }]}>
          📅 Date: {event.date}
        </Text>

        <Text style={[styles.meta, darkMode && styles.darkText, { fontSize }]}>
          ⏰ Time: {event.startTime}–{event.endTime}
        </Text>

        <Text style={[styles.meta, darkMode && styles.darkText, { fontSize }]}>
          📍 Location: {event.location}
        </Text>

        <Text style={[styles.meta, darkMode && styles.darkText, { fontSize }]}>
          👥 Capacity: {event.capacity}
        </Text>

        <Text style={[styles.meta, darkMode && styles.darkText, { fontSize }]}>
          ✅ Spots remaining: {event.spotsRemaining}
        </Text>

        <Text style={[styles.sectionTitle, darkMode && styles.darkText, { fontSize: fontSize + 4 }]}>
          About this event
        </Text>

        <Text style={[styles.description, darkMode && styles.darkText, { fontSize }]}>
          {event.description}
        </Text>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() =>
            router.push({
              pathname: '/register',
              params: {
                eventId: String(event.id),
                eventTitle: event.title,
                spotsRemaining: String(event.spotsRemaining),
                capacity: String(event.capacity),
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
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 16,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    elevation: 4,
  },
  darkCard: {
    backgroundColor: '#2B2B2B',
  },
  darkText: {
    color: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#424754',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#DDAB5E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  tagText: {
    color: '#424754',
    fontWeight: '700',
  },
  meta: {
    color: '#424754',
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#424754',
    marginTop: 12,
    marginBottom: 8,
  },
  description: {
    color: '#424754',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#3CA6E5',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});