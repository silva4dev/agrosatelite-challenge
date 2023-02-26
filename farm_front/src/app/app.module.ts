import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BasemapComponent } from './basemap/basemap.component'
import { FarmComponent } from './farm/farm.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { FarmFormComponent } from './farm-form/farm-form.component'
import { HttpClientModule } from '@angular/common/http'
import { DetailsComponent } from './details/details.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
@NgModule({
  declarations: [
    AppComponent,
    BasemapComponent,
    FarmComponent,
    DashboardComponent,
    FarmFormComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
