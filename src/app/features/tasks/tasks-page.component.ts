import {
    ChangeDetectionStrategy,
    Component,
    computed,
    signal,
  } from '@angular/core';
  import { NgIf } from '@angular/common';
  import { TaskStoreService } from '../../core/services/task-store.service';
  import { TaskStatus } from '../../core/models/task.model';
  import { TaskFormComponent } from './task-form.component';
  import { TaskBoardComponent } from './task-board.component';

  
  @Component({
    selector: 'app-tasks-page',
    standalone: true,
    imports: [NgIf, TaskBoardComponent, TaskFormComponent],
    template: `
      <section class="page">
        <header class="page-header">
          <div>
            <h2>Kanban Board</h2>
            <p class="subtitle">
              Manage your tasks across Todo, In Progress, and Done
            </p>
          </div>
  
          <button class="primary-btn" (click)="onAddTaskClick()">
            + New Task
          </button>
        </header>
  
        <section class="summary">
          <div class="chip">
            Todo
            <strong>{{ todoCount() }}</strong>
          </div>
          <div class="chip">
            In progress
            <strong>{{ inProgressCount() }}</strong>
          </div>
          <div class="chip">
            Done
            <strong>{{ doneCount() }}</strong>
          </div>
        </section>
  
        <app-task-board
          [todoTasks]="taskStore.todoTasks()"
          [inProgressTasks]="taskStore.inProgressTasks()"
          [doneTasks]="taskStore.doneTasks()"
          (move)="onMoveTask($event.id, $event.status)"
          (delete)="onDeleteTask($event.id)"
        ></app-task-board>
  
        <app-task-form
          *ngIf="showForm()"
          (cancel)="showForm.set(false)"
          (save)="onCreateTask($event)"
        ></app-task-form>
      </section>
    `,
    styles: [
      `
        .page {
          max-width: 1200px;
          margin: 0 auto;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        h2 {
          margin: 0;
        }
        .subtitle {
          margin: 0.25rem 0 0;
          color: #9ca3af;
          font-size: 0.9rem;
        }
        .primary-btn {
          background: #4f46e5;
          border: none;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .primary-btn:hover {
          background: #4338ca;
        }
        .summary {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .chip {
          background: #020617;
          border-radius: 999px;
          padding: 0.3rem 0.7rem;
          font-size: 0.8rem;
          border: 1px solid #1e293b;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .chip strong {
          color: #e5e7eb;
        }
  
        @media (max-width: 640px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class TasksPageComponent {
    showForm = signal(false);
  
    todoCount = computed(() => this.taskStore.todoTasks().length);
    inProgressCount = computed(() => this.taskStore.inProgressTasks().length);
    doneCount = computed(() => this.taskStore.doneTasks().length);
  
    constructor(public taskStore: TaskStoreService) {}
  
    onAddTaskClick(): void {
      this.showForm.set(true);
    }
  
    onCreateTask(event: {
      title: string;
      description?: string;
      status: TaskStatus;
    }): void {
      this.taskStore.addTask(event);
      this.showForm.set(false);
    }
  
    onMoveTask(id: string, status: TaskStatus): void {
      this.taskStore.moveTask(id, status);
    }
  
    onDeleteTask(id: string): void {
      this.taskStore.deleteTask(id);
    }
  }