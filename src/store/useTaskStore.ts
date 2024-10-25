import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {tasks} from './testData';
import type {Task} from '../types/types';
import moment from 'moment';

interface TaskStore {
  onboarding: boolean;
  updateOnboarding: () => void;
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, newName: string) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    set => ({
      onboarding: true,
      updateOnboarding: () => {
        set(state => ({
          onboarding: false,
        }));
      },
      tasks: tasks,
      addTask: task => {
        console.log('actualizando', task);

        if (task.id) {
          set(state => ({
            tasks: state.tasks.map(t => {
              if (task.id === t.id) {
                return task;
              }
              return t;
            }),
          }));
        } else {
          set(state => ({
            tasks: [
              ...state.tasks,
              {
                ...task,
                id: Date.now().toString(),
                status: 'open',
                start_time: moment().format('dddd DD, hh:mm A'),
              },
            ],
          }));
        }
      },
      toggleTaskCompletion: id => {
        set(state => ({
          tasks: state.tasks.map(task => {
            if (task.id === id) {
              const status = task.status === 'open' ? 'done' : 'open';
              return {
                ...task,
                status,
                end_time:
                  task.status === 'open'
                    ? moment().format('dddd DD, hh:mm A')
                    : null,
              };
            }
            return task;
          }),
        }));
      },
      deleteTask: id => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id),
        }));
      },
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
