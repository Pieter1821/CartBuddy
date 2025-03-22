import React from 'react';
import { View, Text, StyleSheet, Image, Linking, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Phone } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Help & Support</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About CartBuddy</Text>
          <Text style={styles.description}>
            CartBuddy helps you keep track of your shopping list and calculate your total spending in Rand. Simple, easy to use, and perfect for your shopping needs.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need Help?</Text>
          <Pressable
            style={styles.contactButton}
            onPress={() => Linking.openURL('mailto:support@cartbuddy.com')}
          >
            <Mail size={24} color="#22C55E" />
            <Text style={styles.contactButtonText}>Email Support</Text>
          </Pressable>
          <Pressable
            style={styles.contactButton}
            onPress={() => Linking.openURL('tel:+27123456789')}
          >
            <Phone size={24} color="#22C55E" />
            <Text style={styles.contactButtonText}>Call Support</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#22C55E',
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#64748B',
    lineHeight: 28,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  contactButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginLeft: 12,
  },
  version: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
});