import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//TODO: Remove unused references
import {
    MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, 
    MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
    MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { HttpModule } from '@angular/http';

import { InvestmentFundService, SignalRHubService, UserService, ConnectionResolver } from "./services";
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { RequestformComponent } from './requestform/requestform.component';
import { FundDetailComponent } from './funddetail/funddetail.component';
import { FundlistComponent } from './fundlist/fundlist.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
      AppComponent,
      RequestformComponent,
      FundDetailComponent,
      FundlistComponent,
      HomeComponent
  ],
  imports: [
      HttpModule,
      routing,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,


      //TODO: Remove unused references
      MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
      MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
      MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
      MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
      MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
      MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
      MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule
  ],
  providers: [InvestmentFundService, SignalRHubService, UserService, ConnectionResolver],
  bootstrap: [AppComponent],
  entryComponents: [RequestformComponent]
})
export class AppModule { }
