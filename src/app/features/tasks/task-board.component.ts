import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgFor } from '@angular/common';
import { Task, TaskStatus } from '../../core/models/task.model';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="board">
      <div class="column">
        <header class="column-header">
          <span class="dot dot-todo"></span>
          <h3>Todo</h3>
          <span class="count">{{ todoTasks?.length || 0 }}</span>
        </header>

        <div class="column-body">
          <article
            *ngFor="let task of todoTasks; trackBy: trackById"
            class="card"
          >
            <header class="card-header">
              <h4>{{ task.title }}</h4>
            </header>
            <p class="card-description" *ngIf="task.description">
              {{ task.description }}
            </p>
            <footer class="card-footer">
              <button
                class="pill"
                (click)="move.emit({ id: task.id, status: 'inProgress' })"
              >
                Move to In Progress
              </button>
              <button
                class="pill ghost"
                (click)="delete.emit({ id: task.id })"
              >
                Delete
              </button>
            </footer>
          </article>
        </div>
      </div>

      <div class="column">
        <header class="column-header">
          <span class="dot dot-progress"></span>
          <h3>In Progress</h3>
          <span class="count">{{ inProgressTasks?.length || 0 }}</span>
        </header>

        <div class="column-body">
          <article
            *ngFor="let task of inProgressTasks; trackBy: trackById"
            class="card"
          >
            <header class="card-header">
              <h4>{{ task.title }}</h4>
            </header>
            <p class="card-description" *ngIf="task.description">
              {{ task.description }}
            </p>
            <footer class="card-footer">
              <button
                class="pill"
                (click)="move.emit({ id: task.id, status: 'todo' })"
              >
                Back to Todo
              </button>
              <button
                class="pill"
                (click)="move.emit({ id: task.id, status: 'done' })"
              >
                Mark Done
              </button>
              <button
                class="pill ghost"
                (click)="delete.emit({ id: task.id })"
              >
                Delete
              </button>
            </footer>
          </article>
        </div>
      </div>

      <div class="column">
        <header class="column-header">
          <span class="dot dot-done"></span>
          <h3>Done</h3>
          <span class="count">{{ doneTasks?.length || 0 }}</span>
        </header>

        <div class="column-body">
          <article
            *ngFor="let task of doneTasks; trackBy: trackById"
            class="card"
          >
            <header class="card-header">
              <h4>{{ task.title }}</h4>
            </header>
            <p class="card-description" *ngIf="task.description">
              {{ task.description }}
            </p>
            <footer class="card-footer">
              <button
                class="pill"
                (click)="move.emit({ id: task.id, status: 'inProgress' })"
              >
                Back to In Progress
              </button>
              <button
                class="pill ghost"
                (click)="delete.emit({ id: task.id })"
              >
                Delete
              </button>
            </footer>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .board {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        align-items: flex-start;
      }
      .column {
        background: #020617;
        border-radius: 0.75rem;
        border: 1px solid #1e293b;
        padding: 0.75rem;
        min-height: 200px;
      }
      .column-header {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: 0.75rem;
      }
      .column-header h3 {
        font-size: 0.95rem;
        margin: 0;
      }
      .count {
        margin-left: auto;
        font-size: 0.8rem;
        color: #9ca3af;
      }
      .dot {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 999px;
      }
      .dot-todo {
        background: #f97316;
      }
      .dot-progress {
        background: #22c55e;
      }
      .dot-done {
        background: #38bdf8;
      }
      .column-body {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .card {
        background: #020617;
        border-radius: 0.6rem;
        border: 1px solid #1f2937;
        padding: 0.6rem 0.7rem;
      }
      .card-header h4 {
        font-size: 0.9rem;
        margin: 0 0 0.25rem;
      }
      .card-description {
        margin: 0 0 0.5rem;
        font-size: 0.8rem;
        color: #9ca3af;
      }
      .card-footer {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
      .pill {
        border-radius: 999px;
        border: none;
        padding: 0.25rem 0.7rem;
        font-size: 0.75rem;
        cursor: pointer;
        background: #111827;
        color: #e5e7eb;
      }
      .pill:hover {
        background: #1f2937;
      }
      .pill.ghost {
        background: transparent;
        border: 1px solid #374151;
      }
      .pill.ghost:hover {
        background: #020617;
      }

      @media (max-width: 900px) {
        .board {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardComponent {
  @Input() todoTasks: ReadonlyArray<Task> | null = [];
  @Input() inProgressTasks: ReadonlyArray<Task> | null = [];
  @Input() doneTasks: ReadonlyArray<Task> | null = [];

  @Output() move = new EventEmitter<{ id: string; status: TaskStatus }>();
  @Output() delete = new EventEmitter<{ id: string }>();

  trackById(index: number, item: Task): string {
    return item.id;
  }
}