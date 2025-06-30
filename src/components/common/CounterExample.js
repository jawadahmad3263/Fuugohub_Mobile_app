/**
 * Counter Example Component
 * Demonstrates Redux Toolkit usage with a simple counter
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount, increment, decrement, reset } from '../../store/slices/counterSlice';
import Toast from 'react-native-toast-message';

const CounterExample = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
    Toast.show({
      type: 'success',
      text1: 'Counter Incremented',
      text2: `Value is now ${count + 1}`,
    });
  };

  const handleDecrement = () => {
    dispatch(decrement());
    Toast.show({
      type: 'info',
      text1: 'Counter Decremented',
      text2: `Value is now ${count - 1}`,
    });
  };

  const handleReset = () => {
    dispatch(reset());
    Toast.show({
      type: 'success',
      text1: 'Counter Reset',
      text2: 'Value is now 0',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Toolkit Counter Example</Text>
      
      <View style={styles.counterContainer}>
        <Text style={styles.counterValue}>{count}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  counterContainer: {
    marginBottom: 20,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#f4511e',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f4511e',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#666',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CounterExample; 