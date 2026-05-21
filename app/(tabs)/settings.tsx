import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSettings } from './settingscontext';

export default function SettingsScreen() {
  const {
    darkMode,
    setDarkMode,
    sound,
    setSound,
    textSize,
    setTextSize,
    fontSize,
  } = useSettings();

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkContainer]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.heading, { fontSize: fontSize + 10 }]}>Settings</Text>

      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Text style={[styles.cardTitle, darkMode && styles.darkText, { fontSize: fontSize + 3 }]}>
          Text Size
        </Text>
        <Text style={[styles.cardText, darkMode && styles.darkText, { fontSize }]}>
          Adjust the display text size
        </Text>

        <View style={styles.buttonRow}>
          {['Small', 'Medium', 'Large'].map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeButton, textSize === size && styles.activeButton]}
              onPress={() => setTextSize(size as 'Small' | 'Medium' | 'Large')}
            >
              <Text style={textSize === size ? styles.activeButtonText : styles.sizeButtonText}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Text style={[styles.cardTitle, darkMode && styles.darkText, { fontSize: fontSize + 3 }]}>
          Dark Mode
        </Text>
        <Text style={[styles.cardText, darkMode && styles.darkText, { fontSize }]}>
          Switch to dark theme
        </Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Text style={[styles.cardTitle, darkMode && styles.darkText, { fontSize: fontSize + 3 }]}>
          Sound
        </Text>
        <Text style={[styles.cardText, darkMode && styles.darkText, { fontSize }]}>
          {sound ? 'Sound is currently enabled' : 'Sound is currently disabled'}
        </Text>
        <Switch value={sound} onValueChange={setSound} />
      </View>

      <View style={[styles.card, darkMode && styles.darkCard]}>
        <Text style={[styles.cardTitle, darkMode && styles.darkText, { fontSize: fontSize + 3 }]}>
          Accessibility Preview
        </Text>
        <Text style={[styles.cardText, darkMode && styles.darkText, { fontSize }]}>
          This preview text changes size and theme based on your selected settings.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#2F86B7' },
  darkContainer: { backgroundColor: '#1E1E1E' },
  content: { padding: 20, paddingBottom: 40 },
  heading: { marginTop: 40, marginBottom: 20, fontWeight: '700', color: '#FFFFFF' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 18, marginBottom: 14, elevation: 4 },
  darkCard: { backgroundColor: '#2B2B2B' },
  cardTitle: { color: '#424754', fontWeight: '700', marginBottom: 6 },
  cardText: { color: '#424754', marginBottom: 12 },
  darkText: { color: '#FFFFFF' },
  buttonRow: { flexDirection: 'row', gap: 10 },
  sizeButton: { backgroundColor: '#F5F5F5', paddingHorizontal: 14, paddingVertical: 12, borderRadius: 10 },
  activeButton: { backgroundColor: '#3CA6E5' },
  sizeButtonText: { color: '#424754', fontWeight: '700' },
  activeButtonText: { color: '#FFFFFF', fontWeight: '700' },
});