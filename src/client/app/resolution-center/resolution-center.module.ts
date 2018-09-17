import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ResolutionCenterComponent } from './resolution-center.component';
import { InboxComponent } from './inbox/inbox.component';
import { ObjectionComponent } from './objection/objection.component';
import { CreateObjectionComponent } from './create-objection/create-objection.component';
import { ModalComponent } from '../app/modal/modal.component';

import { ResolutionCenterRoutingModule } from './resolution-center-routing.module';
import { ResolutionCenterService } from './resolution-center.service';
import { OutboxComponent } from './outbox/outbox.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ResolutionCenterRoutingModule,
    FormsModule,
  ],
  declarations: [
    ResolutionCenterComponent, 
    InboxComponent, 
    ObjectionComponent, 
    CreateObjectionComponent,
    ModalComponent,
    OutboxComponent,
  ],
  providers: [
    ResolutionCenterService,
  ],
  exports: [
    ModalComponent,
  ]
})
export class ResolutionCenterModule { }
