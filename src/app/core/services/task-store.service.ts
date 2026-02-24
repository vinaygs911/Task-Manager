import { Injectable, computed, signal } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'taskflow_tasks_v1';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  private readonly tasksSignal = signal<ReadonlyArray<Task>>([]);

  readonly tasks = computed(() => this.tasksSignal());
  readonly todoTasks = computed(() =>
    this.tasksSignal().filter((t) => t.status === 'todo')
  );
  readonly inProgressTasks = computed(() =>
    this.tasksSignal().filter((t) => t.status === 'inProgress')
  );
  readonly doneTasks = computed(() =>
    this.tasksSignal().filter((t) => t.status === 'done')
  );

  constructor(private storage: StorageService) {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = this.storage.getItem<ReadonlyArray<Task>>(STORAGE_KEY);
    if (stored && Array.isArray(stored)) {
      this.tasksSignal.set(stored);
    } else {
      // seed data for first run
      const now = new Date().toISOString();
      const seed: Task[] = [
        {
          id: crypto.randomUUID(),
          title: 'Set up project structure',
          description: 'Create core and features folders',
          status: 'todo',
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          title: 'Implement task store',
          description: 'Signals-based store with localStorage',
          status: 'inProgress',
          createdAt: now,
          updatedAt: now,
        },
        {
          id: crypto.randomUUID(),
          title: 'Style Kanban board',
          description: 'Columns, cards, responsive layout',
          status: 'done',
          createdAt: now,
          updatedAt: now,
        },
      ];
      this.tasksSignal.set(seed);
      this.persist();
    }
  }

  private persist(): void {
    this.storage.setItem(STORAGE_KEY, this.tasksSignal());
  }

  addTask(partial: { title: string; description?: string; status: TaskStatus }) {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: partial.title,
      description: partial.description,
      status: partial.status,
      createdAt: now,
      updatedAt: now,
    };
    this.tasksSignal.update((current) => [...current, newTask]);
    this.persist();
  }

  updateTask(
    id: string,
    changes: Partial<Omit<Task, 'id' | 'createdAt'>>
  ): void {
    const now = new Date().toISOString();
    this.tasksSignal.update((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              ...changes,
              updatedAt: now,
            }
          : task
      )
    );
    this.persist();
  }

  moveTask(id: string, status: TaskStatus): void {
    this.updateTask(id, { status });
  }

  deleteTask(id: string): void {
    this.tasksSignal.update((current) => current.filter((t) => t.id !== id));
    this.persist();
  }
}