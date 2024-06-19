import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'display',
    component : DetailsComponent
  },
  // { path: '', redirectTo: 'register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
