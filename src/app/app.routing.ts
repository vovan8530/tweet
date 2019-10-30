import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import {TweetsComponent} from '@app/tweets/tweets.component';

const routes: Routes = [
    { path: '', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'search', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'tweets', component: TweetsComponent },

    // otherwise redirect to admin
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
