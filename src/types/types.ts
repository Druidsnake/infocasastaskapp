export type Task = {
  id?: string;
  name: string;
  project: string;
  status?: 'open' | 'done';
  start_time?: any;
  end_time?: any;
};
