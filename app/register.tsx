import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createRegistration, createUser, updateEventSpotsRemaining } from '@/src/data/backendApi';


export default function RegisterScreen() {
  const router = useRouter();
 const { eventId, eventTitle, spotsRemaining } = useLocalSearchParams();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!eventId) {
      setMessage('Event could not be found. Please go back and choose an event again.');
      return;
    }

    if (!fullName || !email || !phone) {
      setMessage('Please enter your full name, email, and phone number.');
      return;
    }

    try {
      setSubmitting(true);
      setMessage('');

      const newUser = await createUser({
        fullName,
        name: fullName,
        email,
        phone,
        role: 'member',
        deactivated: false,
      });

  await createRegistration({
  eventId: Number(eventId),
  userId: Number(newUser.id),
  name: fullName,
  email,
  phone,
});

try {
  await updateEventSpotsRemaining(
    Number(eventId),
    Math.max(Number(spotsRemaining) - 1, 0)
  );
} catch (error) {
  console.log('Spots update failed, but registration was created.');
}

      setMessage(`Registration Successful — you are booked for ${eventTitle}.`);
      setFullName('');
      setEmail('');
      setPhone('');
    } catch {
      setMessage('Unable to complete registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back to Event</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Event: {eventTitle}</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Enter full name" value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>Email Address</Text>
        <TextInput style={styles.input} placeholder="Enter email address" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} placeholder="Enter phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={submitting}>
          <Text style={styles.submitText}>{submitting ? 'Submitting...' : 'Submit Registration'}</Text>
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