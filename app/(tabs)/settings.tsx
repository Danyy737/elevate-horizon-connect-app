import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [sound, setSound] = useState(true);
  const [textSize, setTextSize] = useState('Medium');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Text Size</Text>
        <Text style={styles.cardText}>Adjust the display text size</Text>

        <View style={styles.buttonRow}>
          {['Small', 'Medium', 'Large'].map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeButton, textSize === size && styles.activeButton]}
              onPress={() => setTextSize(size)}
            >
              <Text style={textSize === size ? styles.activeButtonText : styles.sizeButtonText}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dark Mode</Text>
        <Text style={styles.cardText}>Switch to dark theme</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sound</Text>
        <Text style={styles.cardText}>Enable notification and interaction sounds</Text>
        <Switch value={sound} onValueChange={setSound} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Accessibility Notes</Text>
        <Text style={styles.cardText}>
          This screen supports accessibility by allowing users to adjust display preferences.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#2F86B7' },
  content: { padding: 20, paddingBottom: 40 },
  heading: { marginTop: 40, marginBottom: 20, fontSize: 28, fontWeight: '700', color: '#FFFFFF' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 18, marginBottom: 14, elevation: 4 },
  cardTitle: { color: '#424754', fontWeight: '700', fontSize: 20, marginBottom: 6 },
  cardText: { color: '#424754', fontSize: 15, marginBottom: 12 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  sizeButton: { backgroundColor: '#F5F5F5', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 10 },
  activeButton: { backgroundColor: '#3CA6E5' },
  sizeButtonText: { color: '#424754', fontWeight: '700' },
  activeButtonText: { color: '#FFFFFF', fontWeight: '700' },
});