import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'angular-custom-modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { ResolutionCenterModule } from './resolution-center/resolution-center.module';
import { UiModule } from './ui/ui.module';

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
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { RequestPasswordChangeComponent } from './request-password-change/request-password-change.component';
import { AuthInterceptor } from './services/auth-interceptor';
// import { ModalComponent } from './app/modal/modal.component';

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
    ForgottenPasswordComponent,
    RequestPasswordChangeComponent,
    // ModalComponent,
  ],
  imports: [
    BrowserModule,
    UiModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    ResolutionCenterModule,
    AppRoutingModule,
  ],
  providers: [
    // provides the interceptor
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
