import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-shell">
      <header class="app-header">
        <h1>TaskFlow Kanban</h1>
      </header>

      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .app-shell {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          sans-serif;
        background: #020617;
        color: #e5e7eb;
      }
      .app-header {
        padding: 1rem 2rem;
        border-bottom: 1px solid #1e293b;
        background: #020617;
        position: sticky;
        top: 0;
        z-index: 10;
      }
      h1 {
        margin: 0;
        font-size: 1.4rem;
      }
      .app-main {
        flex: 1;
        padding: 1.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}