import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Button,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddTaskModal from '../../components/AddTaskModal';
import {formatDate} from '../../utils/utils';
import {useTaskStore} from '../../store/useTaskStore';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import type {Task} from '../../types/types';
import ListItem from '../../components/ListItem';

const HomeScreen = () => {
  const {tasks: storeTasks, addTask} = useTaskStore();

  const [tasks, setTasks] = useState(storeTasks);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTask, setEditTask] = useState();

  useEffect(() => {
    setTasks(storeTasks);
  }, [storeTasks]);

  const filterData = (item: Task) => {
    if (item) {
      const filtered = tasks.filter(task => task.name === item.name);
      setTasks(filtered);
    } else {
      setTasks(storeTasks);
    }
  };

  const setFilter = (filter: string) => {
    switch (filter) {
      case 'open':
        setTasks(storeTasks.filter(f => f.status === 'open'));
        break;
      case 'done':
        setTasks(storeTasks.filter(f => f.status === 'done'));
        break;
      default:
        setTasks(storeTasks);
        break;
    }
  };

  const onEditTask = (task: Task) => {
    setEditTask(task);
    setIsModalVisible(true);
  };

  const renderItem = useCallback(
    ({item, index}: {item: Task; index: number}) => (
      <ListItem key={index} item={item} onEditTask={onEditTask} />
    ),
    [onEditTask],
  );

  const keyExtractor = useCallback((item: Task) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>INFOCasas Tasks</Text>
          <Text style={styles.headerDate}>{formatDate(new Date())}</Text>
        </View>
        <View style={{marginRight: 20}}>
          <Button
            title="+ New Task"
            onPress={() => {
              setEditTask(undefined);
              setIsModalVisible(true);
            }}
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View
          style={{
            position: 'absolute',
            left: 20,
            width: 30,
            height: '100%',
            zIndex: 999,
            justifyContent: 'center',
          }}>
          <Icon name="search" size={24} />
        </View>
        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          onSelectItem={filterData}
          dataSet={tasks.map(f => {
            f.title = f.name;
            return f;
          })}
          inputContainerStyle={{paddingLeft: 30}}
        />
      </View>

      <View style={styles.filterContainer}>
        <Pressable onPress={() => setFilter('all')}>
          <Text style={styles.filterText}>All ({storeTasks.length})</Text>
        </Pressable>
        <Pressable onPress={() => setFilter('open')}>
          <Text style={styles.filterText}>
            Open ({storeTasks.filter(f => f.status === 'open').length})
          </Text>
        </Pressable>
        <Pressable onPress={() => setFilter('done')}>
          <Text style={styles.filterText}>
            Done ({storeTasks.filter(f => f.status === 'done').length})
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        contentContainerStyle={styles.flatlistContentContainer}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews={false}
        maxToRenderPerBatch={10}
        windowSize={10}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>No results</Text>
        )}
      />
      <AddTaskModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        onAdd={(task: Task) => {
          addTask(task);
        }}
        editTask={editTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 0,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerTitleContainer: {
    paddingRight: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerDate: {
    color: '#888',
    marginBottom: 10,
  },
  newTaskButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  newTaskButtonText: {
    color: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  filterText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  flatlistContentContainer: {
    flexGrow: 1,
  },
  taskCard: {
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  taskInfo: {
    flex: 3,
  },
  taskTitle: {
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
  avatar: {
    marginRight: 5,
  },
  searchContainer: {
    position: 'relative',
    paddingHorizontal: 10,
    height: 45,
    padding: 0,
    backgroundColor: '#fff',
  },

  searchInputContainer: {
    height: 45,
    padding: 0,
  },

  searchInput: {
    borderBottomWidth: 0,
    backgroundColor: '#f0f0f0',
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  rightAction: {width: 50, backgroundColor: 'purple', flex: 1},
  separator: {
    width: '100%',
    borderTopWidth: 1,
  },
  swipeable: {
    height: 50,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
  },
  emptyListText: {
    marginTop: 40,
    textAlign: 'center',
  },
});

export default HomeScreen;
