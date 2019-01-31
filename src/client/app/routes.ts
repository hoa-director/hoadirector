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
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'login',
    component: LoginComponent ,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'directory',
    component: DirectoryComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'rules',
    component: RulesComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'messages',
    component: MessageComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'financials',
    component: FinancialsComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'exterior',
    component: ExteriorComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'interior',
    component: InteriorComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'board',
    component: BoardComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always',
  },
];
