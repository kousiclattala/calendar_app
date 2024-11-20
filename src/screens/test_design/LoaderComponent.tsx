import {View, Text, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';

type LoaderProps = {
  isLoading: boolean;
};

const LoaderComponent: React.FC<LoaderProps> = ({isLoading}) => {
  return (
    <Modal visible={isLoading} transparent animationType="slide">
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={50} color={'#fff'} />
      </View>
    </Modal>
  );
};

export default LoaderComponent;
