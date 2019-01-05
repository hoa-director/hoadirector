import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from '../app/modal/modal.component';
import { CreateObjectionComponent } from './create-objection/create-objection.component';
import { InboxComponent } from './inbox/inbox.component';
import { ObjectionComponent } from './objection/objection.component';
import { ResolutionCenterComponent } from './resolution-center.component';

import { OutboxComponent } from './outbox/outbox.component';
import { ResolutionCenterRoutingModule } from './resolution-center-routing.module';
import { ResolutionCenterService } from './resolution-center.service';

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
  providers: [ResolutionCenterService],
  exports: [ModalComponent],
})
export class ResolutionCenterModule {}
