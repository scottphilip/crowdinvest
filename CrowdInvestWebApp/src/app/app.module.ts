import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
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

import { InvestmentFundService, SignalRHubService, UserService } from "./services";


import { RequestformComponent } from './requestform/requestform.component';
import { FundDetailComponent } from './funddetail/funddetail.component';
import { FundlistComponent } from './fundlist/fundlist.component';


@NgModule({
  declarations: [
      AppComponent,
      RequestformComponent,
      FundDetailComponent,
      FundlistComponent
  ],
  imports: [
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
  providers: [InvestmentFundService, SignalRHubService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [RequestformComponent]
})
export class AppModule { }
