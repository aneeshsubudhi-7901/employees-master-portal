import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadPdfComponent } from './download-pdf/download-pdf.component';
import { EmployeesViewComponent } from './employees-view/employees-view.component';
import { FormMainComponent } from './form-main/form-main.component';

const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path: 'create', component: FormMainComponent },
  { path: 'employeesView', component: EmployeesViewComponent },
  { path: 'pdf', component: DownloadPdfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
