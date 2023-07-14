import React from 'react';
import { Button, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../redux/counterSlice';
import { useAppSelector } from '../redux/hooks';

export function CounterComponent() {
  // State: a counter value
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // Action: code that causes an update to the state when something happens

  // View: the UI definition
  return (
    <Text>
      Value:
      {' '}
      {count}
      {' '}
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </Text>
  );
}
