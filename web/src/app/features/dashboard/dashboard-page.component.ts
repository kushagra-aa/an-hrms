import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardSummary } from './dashboard.service';
import { CardComponent } from '@/shared/components/card/card.component';
import {
  LucideAngularModule,
  Users,
  UserCheck,
  UserMinus,
  RefreshCw,
  AlertCircle,
  LayoutDashboard,
} from 'lucide-angular';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, CardComponent, LucideAngularModule],
  template: `
    <div class="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight flex items-center gap-3">
            <lucide-icon [name]="dashboardIcon" class="size-8 text-primary/80"></lucide-icon>
            Dashboard
          </h1>
          <p class="text-muted-foreground">
            Welcome to An HRMS. Here's a summary of your workforce today.
          </p>
        </div>
        <button
          (click)="loadSummary()"
          class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md bg-muted hover:bg-muted/80 transition-colors"
          [disabled]="isLoading()"
        >
          <lucide-icon
            [name]="refreshIcon"
            class="size-3.5"
            [class.animate-spin]="isLoading()"
          ></lucide-icon>
          Refresh
        </button>
      </div>

      @if (error()) {
        <div
          class="rounded-lg border border-destructive/50 bg-destructive/10 p-4 animate-in slide-in-from-top-2"
        >
          <div class="flex items-center gap-3 text-destructive">
            <lucide-icon [name]="errorIcon" class="size-5"></lucide-icon>
            <div>
              <p class="font-medium">Dashboard Error</p>
              <p class="text-xs opacity-80 mt-0.5">{{ error() }}</p>
            </div>
            <button
              (click)="loadSummary()"
              class="ml-auto text-xs font-bold underline underline-offset-4"
            >
              Try Again
            </button>
          </div>
        </div>
      }

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total Employees -->
        <app-card class="bg-primary/5 border-primary/10 shadow-sm relative overflow-hidden group">
          <div
            class="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"
          >
            <lucide-icon [name]="usersIcon" class="size-32"></lucide-icon>
          </div>
          <div card-title class="flex items-center gap-2">
            <div class="p-2 rounded-lg bg-primary/10 text-primary">
              <lucide-icon [name]="usersIcon" class="size-5"></lucide-icon>
            </div>
            <span class="text-sm font-bold uppercase tracking-wider text-muted-foreground"
              >Total Employees</span
            >
          </div>
          <div class="mt-4">
            @if (isLoading()) {
              <div class="h-10 w-24 bg-muted animate-pulse rounded"></div>
            } @else {
              <div class="text-4xl font-black tracking-tighter">
                {{ summary()?.totalEmployees ?? 0 }}
              </div>
            }
            <p class="text-xs text-muted-foreground mt-1 italic">Active workforce directory</p>
          </div>
        </app-card>

        <!-- Today Present -->
        <app-card
          class="bg-green-500/5 border-green-500/10 shadow-sm relative overflow-hidden group"
        >
          <div
            class="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"
          >
            <lucide-icon [name]="presentIcon" class="size-32 text-green-500"></lucide-icon>
          </div>
          <div card-title class="flex items-center gap-2">
            <div class="p-2 rounded-lg bg-green-500/10 text-green-600">
              <lucide-icon [name]="presentIcon" class="size-5"></lucide-icon>
            </div>
            <span class="text-sm font-bold uppercase tracking-wider text-muted-foreground"
              >Today Present</span
            >
          </div>
          <div class="mt-4">
            @if (isLoading()) {
              <div class="h-10 w-24 bg-muted animate-pulse rounded"></div>
            } @else {
              <div class="text-4xl font-black tracking-tighter text-green-600">
                {{ summary()?.presentToday ?? 0 }}
              </div>
            }
            <p class="text-xs text-muted-foreground mt-1 italic">Employees clocked in today</p>
          </div>
        </app-card>

        <!-- Today Absent -->
        <app-card class="bg-red-500/5 border-red-500/10 shadow-sm relative overflow-hidden group">
          <div
            class="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"
          >
            <lucide-icon [name]="absentIcon" class="size-32 text-red-500"></lucide-icon>
          </div>
          <div card-title class="flex items-center gap-2">
            <div class="p-2 rounded-lg bg-red-500/10 text-red-600">
              <lucide-icon [name]="absentIcon" class="size-5"></lucide-icon>
            </div>
            <span class="text-sm font-bold uppercase tracking-wider text-muted-foreground"
              >Today Absent</span
            >
          </div>
          <div class="mt-4">
            @if (isLoading()) {
              <div class="h-10 w-24 bg-muted animate-pulse rounded"></div>
            } @else {
              <div class="text-4xl font-black tracking-tighter text-red-600">
                {{ summary()?.absentToday ?? 0 }}
              </div>
            }
            <p class="text-xs text-muted-foreground mt-1 italic">Employee attendance gaps</p>
          </div>
        </app-card>
      </div>

      <div
        class="mt-12 p-8 rounded-xl border border-dashed border-border/50 bg-muted/20 flex flex-col items-center text-center"
      >
        <div class="p-4 rounded-full bg-background border shadow-sm mb-4">
          <lucide-icon [name]="dashboardIcon" class="size-10 text-primary/40"></lucide-icon>
        </div>
        <h2 class="text-xl font-semibold">Quick Actions</h2>
        <p class="text-sm text-muted-foreground max-w-md mt-2">
          Use the navigation menu to manage employees or record attendance. More features coming
          soon.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class DashboardPageComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  summary = signal<DashboardSummary | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  readonly dashboardIcon = LayoutDashboard;
  readonly usersIcon = Users;
  readonly presentIcon = UserCheck;
  readonly absentIcon = UserMinus;
  readonly refreshIcon = RefreshCw;
  readonly errorIcon = AlertCircle;

  ngOnInit() {
    this.loadSummary();
  }

  loadSummary() {
    this.isLoading.set(true);
    this.error.set(null);

    this.dashboardService
      .getSummary()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data: DashboardSummary) => this.summary.set(data),
        error: (err: any) => {
          console.error('Error fetching dashboard summary:', err);
          this.error.set(
            'Failed to load dashboard statistics. Please check if the backend is running.',
          );
        },
      });
  }
}
