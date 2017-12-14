import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './photo/list/photo-list.component';

const routes: Routes = [
  {
    path: '',
    component: PhotoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
