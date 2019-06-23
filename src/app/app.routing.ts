import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TimerComponent } from './meditation-timer/timer.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { StatsComponent } from './meditation-timer/stats/stats.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { CanDeactivateGuard } from './shared/services/canDeactivatae-guard.service';

const appRoutes: Routes = [{
    path: '',
    redirectTo: '/timer',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountSettingsComponent, canActivate: [AuthGuard]},
  { path: 'timer', component: TimerComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },

  { path: '**', component: TimerComponent, canActivate: [AuthGuard] },
];

export const routing = RouterModule.forRoot(appRoutes);
