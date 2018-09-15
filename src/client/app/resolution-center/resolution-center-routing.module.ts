import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ObjectionComponent } from './objection/objection.component';
import { CreateObjectionComponent } from './create-objection/create-objection.component';
import { ResolutionCenterComponent } from './resolution-center.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  { path: 'resolution-center',
    component: ResolutionCenterComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: '/resolution-center/inbox', pathMatch: 'full' },
      { path: 'inbox', component: InboxComponent },
      { path: 'objection/view/:id', component: ObjectionComponent },
      { path: 'objection/create', component: CreateObjectionComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResolutionCenterRoutingModule { }
