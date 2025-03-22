import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Platform, Text } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface GroceryItemProps {
  item: {
    id: string;
    name: string;
    price: string;
  };
  onUpdateName: (id: string, name: string) => void;
  onUpdatePrice: (id: string, price: string) => void;
  onDelete: (id: string) => void;
}

export function GroceryItem({ item, onUpdateName, onUpdatePrice, onDelete }: GroceryItemProps) {
  return (
    <Animated.View 
      entering={FadeIn} 
      exiting={FadeOut}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.nameInput}
          value={item.name}
          onChangeText={(text) => onUpdateName(item.id, text)}
          placeholder="Item name"
          placeholderTextColor="#94A3B8"
          autoCapitalize="words"
        />
        <View style={styles.priceContainer}>
          <View style={styles.currencyLabel}>
            <Text style={styles.currencyText}>R</Text>
          </View>
          <TextInput
            style={styles.priceInput}
            value={item.price}
            onChangeText={(text) => {
              // Only allow numbers and one decimal point
              const filtered = text.replace(/[^0-9.]/g, '');
              const parts = filtered.split('.');
              if (parts.length > 2) return;
              if (parts[1]?.length > 2) return;
              onUpdatePrice(item.id, filtered);
            }}
            placeholder="0.00"
            keyboardType="decimal-pad"
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>
      <Pressable
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Trash2 size={24} color="#EF4444" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    ...Platform.select({
      web: {
        cursor: 'default',
      },
    }),
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  nameInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#1E293B',
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    minWidth: 120,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  priceInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    width: 90,
    textAlign: 'right',
    padding: 12,
    color: '#1E293B',
  },
  currencyLabel: {
    marginRight: 4,
  },
  currencyText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#22C55E',
  },
  deleteButton: {
    marginLeft: 16,
    padding: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});