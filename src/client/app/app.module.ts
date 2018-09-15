import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'angular-custom-modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { UiModule } from './ui/ui.module';
import { ResolutionCenterModule } from './resolution-center/resolution-center.module';

import { HomeComponent } from './home/home.component';
import { DirectoryComponent } from './app/directory/directory.component';
import { RulesComponent } from './app/rules/rules.component';
import { FinancialsComponent } from './app/financials/financials.component';
import { DocumentsComponent } from './app/documents/documents.component';
import { ExteriorComponent } from './app/exterior/exterior.component';
import { InteriorComponent } from './app/interior/interior.component';
import { BoardComponent } from './app/board/board.component';
import { NotesComponent } from './app/notes/notes.component';
import { ProfileComponent } from './app/profile/profile.component';
import { MessageComponent } from './app/message/message.component';
import { ModalComponent } from './app/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DirectoryComponent,
    RulesComponent,
    FinancialsComponent,
    DocumentsComponent,
    ExteriorComponent,
    InteriorComponent,
    BoardComponent,
    NotesComponent,
    ProfileComponent,
    MessageComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    UiModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    ResolutionCenterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
