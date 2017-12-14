import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { PhotoListComponent } from './photo/list/photo-list.component';
import { PhotoUploadComponent } from './photo/upload/photo-upload.component';
import { PhotoService } from './photo/photo.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    PhotoUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
