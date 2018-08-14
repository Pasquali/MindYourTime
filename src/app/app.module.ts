import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TimerComponent } from './meditation-timer/timer.component';
import { TimerProgressComponent } from './meditation-timer/timer-progress/timer-progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { StatsComponent } from './meditation-timer/stats/stats.component';
import { ChartComponent } from './meditation-timer/stats/chart/chart.component';
import { RegisterComponent } from './register/register.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';

import { ChartModule } from 'angular-highcharts';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './services/auth-guard.service';
const appRoutes: Routes = [{
    path: '',
    redirectTo: '/timer',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountSettingsComponent, canActivate: [AuthGuard]},
  { path: 'timer', component: TimerComponent, canActivate: [AuthGuard] },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },

  { path: '**', component: TimerComponent, canActivate: [AuthGuard] },
];
export function jwtOptionsFactory(cookieService) {
  return {
    tokenGetter: () => {
      return cookieService.get('access_token');
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TimerComponent,
    TimerProgressComponent,
    StatsComponent,
    ChartComponent,
    AccountSettingsComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChartModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [CookieService]
      }
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSliderModule,
    MatExpansionModule
  ],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
