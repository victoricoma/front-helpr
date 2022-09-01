import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesFuturosComponent } from './children/clientes-futuros/clientes-futuros.component';
import { TrabalheConoscoComponent } from './children/trabalhe-conosco/trabalhe-conosco.component';
import { TrabalheConoscoCreateComponent } from './children/trabalhe-conosco-create/trabalhe-conosco-create.component';


@NgModule({
  declarations: [
    LoginComponent,
    ClientesFuturosComponent,
    TrabalheConoscoComponent,
    TrabalheConoscoCreateComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ClientesFuturosComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LoginModule { }
