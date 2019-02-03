import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { CreateObjectionComponent } from './create-objection/create-objection.component';
import { InboxComponent } from './inbox/inbox.component';
import { ObjectionComponent } from './objection/objection.component';
import { OutboxComponent } from './outbox/outbox.component';
import { ResolutionCenterComponent } from './resolution-center.component';

const routes: Routes = [
  {
    path: 'resolution-center',
    component: ResolutionCenterComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: '/resolution-center/inbox', pathMatch: 'full' },
      { path: 'inbox', component: InboxComponent },
      { path: 'outbox', component: OutboxComponent },
      { path: 'objection/create', component: CreateObjectionComponent },
      { path: 'objection/view/:id', component: ObjectionComponent },
      { path: 'objection/:id', component: ObjectionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResolutionCenterRoutingModule {}
