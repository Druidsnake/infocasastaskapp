import React, {useEffect, useState} from 'react';
import {Modal, View, StyleSheet, TextInput, Button} from 'react-native';
import type {Task} from '../types/types';

const AddTaskModal = ({visible, onClose, onAdd, editTask}: any) => {
  const [task, setTask] = useState<Task>({
    name: '',
    project: '',
    status: 'open',
  });

  useEffect(() => {
    if (editTask) {
      setTask(editTask);
    } else {
      setTask({
        name: '',
        project: '',
      });
    }
  }, [editTask]);

  const handleAdd = () => {
    onAdd(task);
    setTask({
      name: '',
      project: '',
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose()}
      style={{flex: 1}}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Task Name"
            value={task.name}
            onChangeText={text => setTask({...task, name: text})}
            style={styles.input}
          />

          <TextInput
            placeholder="Project Name"
            value={task.project}
            onChangeText={text => setTask({...task, project: text})}
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={() => onClose()}
              buttonStyle={[styles.button, styles.cancelButton]}
            />
            <Button
              title={editTask ? 'Update Task' : 'Add Task'}
              onPress={() => handleAdd()}
              buttonStyle={[styles.button, styles.addButton]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    marginBottom: 15,
    height: 45,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 120,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#007bff',
  },
});

export default AddTaskModal;
