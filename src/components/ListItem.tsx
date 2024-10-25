import React from 'react';
import type {Task} from '../types/types';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTaskStore} from '../store/useTaskStore';

const ListItem = ({item, onEditTask}: {item: Task; onEditTask: any}) => {
  const {toggleTaskCompletion, deleteTask} = useTaskStore();

  return (
    <View style={styles.taskCard}>
      <TouchableOpacity onPress={() => onEditTask(item)}>
        <View style={styles.cardContainer}>
          <View style={styles.taskInfo}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}>
              <Text
                style={[
                  styles.taskTitle,
                  item.status === 'done' && {
                    textDecorationLine: 'line-through',
                  },
                ]}>
                {item.name}
              </Text>

              <Pressable
                onPress={() => deleteTask(item.id)}
                style={{alignSelf: 'flex-end'}}>
                <Icon name="delete" color="red" size={30} />
              </Pressable>
            </View>
            <Text style={styles.taskProject}>{item.project}</Text>
            <Text style={styles.taskTime}>
              {`${item.start_time ?? ''} ${
                item.end_time ? ' - ' + item.end_time : ''
              }`}
            </Text>
          </View>
          <Pressable
            style={styles.taskStatus}
            onPress={() => toggleTaskCompletion(item.id)}>
            <Icon
              name={
                item.status === 'done'
                  ? 'check-circle'
                  : 'radio-button-unchecked'
              }
              color={item.status === 'done' ? '#007bff' : '#ccc'}
              size={24}
            />
          </Pressable>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    flex: 1,
  },
  cardContainer: {
    width: '100%',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskProject: {
    color: '#888',
    marginBottom: 5,
  },
  taskTime: {
    color: '#007bff',
  },
  taskStatus: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default ListItem;
