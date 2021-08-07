import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {NewChannelComponent} from './components/new-channel/new-channel.component';
import { AuthGuard } from './auth.guard';
import {ViewChannelComponent} from './components/view-channel/view-channel.component';
import { PostsComponent } from './components/posts/posts.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'createNewChannel',
    component: NewChannelComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'viewChannel',
    component: ViewChannelComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
