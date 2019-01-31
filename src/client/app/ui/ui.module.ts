import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AssociationSwitchComponent } from './association-switch/association-switch.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AssociationSwitchComponent,
  ],
  exports: [LayoutComponent],
})
export class UiModule {}
