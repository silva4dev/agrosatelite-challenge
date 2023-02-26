import { FarmFormComponent } from './farm-form/farm-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmComponent } from './farm/farm.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'farm',
    component: FarmComponent,
    children: [
      {
        path: 'new',
        component: FarmFormComponent
      }
    ]
  },
  {
    path: 'farm/:farmId/details',
    component: DetailsComponent,
    children: [
      {
        path: 'edit/:id',
        component: FarmFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
