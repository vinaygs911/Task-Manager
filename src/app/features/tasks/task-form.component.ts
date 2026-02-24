import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output,
  } from '@angular/core';
  import {
    ReactiveFormsModule,
    FormBuilder,
    Validators,
  } from '@angular/forms';
  import { NgIf } from '@angular/common';
  import { TaskStatus } from '../../core/models/task.model';
  
  @Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    template: `
      <div class="backdrop">
        <div class="dialog">
          <header class="dialog-header">
            <h3>New Task</h3>
          </header>
  
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="dialog-body">
            <label class="field">
              <span>Title</span>
              <input
                type="text"
                formControlName="title"
                placeholder="Implement drag and drop"
              />
              <span class="error" *ngIf="titleInvalid">
                Title is required
              </span>
            </label>
  
            <label class="field">
              <span>Description</span>
              <textarea
                rows="3"
                formControlName="description"
                placeholder="Optional description of the task"
              ></textarea>
            </label>
  
            <label class="field">
              <span>Status</span>
              <select formControlName="status">
                <option value="todo">Todo</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>
  
            <footer class="dialog-footer">
              <button type="button" class="btn ghost" (click)="cancel.emit()">
                Cancel
              </button>
              <button type="submit" class="btn primary" [disabled]="form.invalid">
                Create
              </button>
            </footer>
          </form>
        </div>
      </div>
    `,
    styles: [
      `
        .backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 50;
        }
        .dialog {
          background: #020617;
          border-radius: 0.75rem;
          border: 1px solid #1e293b;
          padding: 1rem 1.25rem;
          width: 100%;
          max-width: 400px;
        }
        .dialog-header h3 {
          margin: 0 0 0.75rem;
        }
        .dialog-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.85rem;
        }
        .field span {
          color: #9ca3af;
        }
        input,
        textarea,
        select {
          background: #020617;
          border-radius: 0.4rem;
          border: 1px solid #1f2937;
          padding: 0.4rem 0.5rem;
          color: #e5e7eb;
          font-size: 0.85rem;
        }
        input:focus,
        textarea:focus,
        select:focus {
          outline: none;
          border-color: #4f46e5;
        }
        .error {
          font-size: 0.75rem;
          color: #f97316;
        }
        .dialog-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        .btn {
          border-radius: 0.4rem;
          padding: 0.35rem 0.8rem;
          font-size: 0.8rem;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .btn.primary {
          background: #4f46e5;
          color: white;
          border-color: #4f46e5;
        }
        .btn.primary[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn.ghost {
          background: transparent;
          color: #e5e7eb;
          border-color: #374151;
        }
      `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class TaskFormComponent {
    @Output() cancel = new EventEmitter<void>();
    @Output() save = new EventEmitter<{
      title: string;
      description?: string;
      status: TaskStatus;
    }>();
  
    form = this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      status: ['todo' as TaskStatus, [Validators.required]],
    });
  
    constructor(private fb: FormBuilder) {}
  
    get titleInvalid(): boolean {
      const ctrl = this.form.controls.title;
      return ctrl.touched && ctrl.invalid;
    }
  
    onSubmit(): void {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      const value = this.form.getRawValue();
      this.save.emit({
        title: value.title,
        description: value.description || undefined,
        status: value.status,
      });
    }
  }