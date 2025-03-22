import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Plus } from 'lucide-react-native';
import { GroceryItem } from '@/components/GroceryItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface GroceryListItem {
  id: string;
  name: string;
  price: string;
}

export default function GroceryListScreen() {
  const [items, setItems] = useState<GroceryListItem[]>([]);

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: '',
      price: '',
    };
    setItems([...items, newItem]);
  };

  const updateItemName = (id: string, name: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, name } : item
    ));
  };

  const updateItemPrice = (id: string, price: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, price } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return items
      .reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0)
      .toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#22C55E', '#16A34A']}
        style={styles.header}
      >
        <Text style={styles.title}>CartBuddy</Text>
        <Text style={styles.subtitle}>Your shopping companion</Text>
      </LinearGradient>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <View style={styles.totalAmountContainer}>
          <Text style={styles.currencySymbol}>R</Text>
          <Text style={styles.totalAmount}>{calculateTotal()}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.list} 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Tap the + button below to add items to your list
            </Text>
          </View>
        ) : (
          items.map(item => (
            <GroceryItem
              key={item.id}
              item={item}
              onUpdateName={updateItemName}
              onUpdatePrice={updateItemPrice}
              onDelete={deleteItem}
            />
          ))
        )}
      </ScrollView>

      <Pressable 
        style={styles.addButton}
        onPress={addItem}
      >
        <Plus size={32} color="#FFFFFF" />
      </Pressable>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  totalContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  totalLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#64748B',
    marginBottom: 8,
  },
  totalAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#22C55E',
    marginRight: 4,
  },
  totalAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#22C55E',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});