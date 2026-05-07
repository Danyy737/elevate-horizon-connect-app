import { Link, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { events } from '@/src/data/events';

export default function RegisterScreen() {
  const { id } = useLocalSearchParams();
  const event = events.find((item) => item.id === id) ?? events[0];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit() {
    if (!fullName || !email) {
      setMessage('Please enter your full name and email address.');
      return;
    }

    setMessage(`Registration Successful — you are booked for ${event.title}.`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Link href={`/event-details?id=${event.id}`} asChild>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>← Back to Event</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Event: {event.title}</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Confirm Registration</Text>
        </TouchableOpacity>

        {message ? (
          <View style={message.includes('Successful') ? styles.successBox : styles.errorBox}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}
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
  title: { fontSize: 28, fontWeight: '700', color: '#424754', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#424754', marginBottom: 20 },
  label: { color: '#424754', fontWeight: '700', marginBottom: 6 },
  input: { backgroundColor: '#F5F5F5', borderRadius: 8, padding: 14, fontSize: 16, marginBottom: 16 },
  submitButton: { backgroundColor: '#3CA6E5', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 4 },
  submitText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  successBox: { backgroundColor: '#DFF5E1', padding: 14, borderRadius: 8, marginTop: 16 },
  errorBox: { backgroundColor: '#FADCDC', padding: 14, borderRadius: 8, marginTop: 16 },
  messageText: { color: '#424754', fontWeight: '700' },
});