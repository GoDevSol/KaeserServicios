import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AModifiedDataComponent } from './aModifiedData.component';
import { AModifiedDataRoutingModule } from './aModifiedData-routing.module';

@NgModule({
  imports: [
    FormsModule,
    AModifiedDataRoutingModule,    
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ AModifiedDataComponent ]
})
export class ALoadDataModule { }
