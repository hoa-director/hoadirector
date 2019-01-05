import { Routes } from '@angular/router';

import { BoardComponent } from './app/board/board.component';
import { DirectoryComponent } from './app/directory/directory.component';
import { DocumentsComponent } from './app/documents/documents.component';
import { ExteriorComponent } from './app/exterior/exterior.component';
import { FinancialsComponent } from './app/financials/financials.component';
import { InteriorComponent } from './app/interior/interior.component';
import { MessageComponent } from './app/message/message.component';
import { NotesComponent } from './app/notes/notes.component';
import { ProfileComponent } from './app/profile/profile.component';
import { RulesComponent } from './app/rules/rules.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'directory',
    component: DirectoryComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'rules', component: RulesComponent, canActivate: [AuthGuardService] },
  {
    path: 'messages',
    component: MessageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'financials',
    component: FinancialsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'exterior',
    component: ExteriorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'interior',
    component: InteriorComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuardService] },
  { path: 'notes', component: NotesComponent, canActivate: [AuthGuardService] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
];
