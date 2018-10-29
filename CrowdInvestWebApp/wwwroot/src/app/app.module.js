"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
//TODO: Remove unused references
var material_1 = require("@angular/material");
var http_1 = require("@angular/http");
var services_1 = require("./services");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var requestform_component_1 = require("./requestform/requestform.component");
var funddetail_component_1 = require("./funddetail/funddetail.component");
var fundlist_component_1 = require("./fundlist/fundlist.component");
var home_component_1 = require("./home/home.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                requestform_component_1.RequestformComponent,
                funddetail_component_1.FundDetailComponent,
                fundlist_component_1.FundlistComponent,
                home_component_1.HomeComponent
            ],
            imports: [
                http_1.HttpModule,
                app_routing_1.routing,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                //TODO: Remove unused references
                material_1.MatAutocompleteModule, material_1.MatBadgeModule, material_1.MatBottomSheetModule, material_1.MatButtonModule,
                material_1.MatButtonToggleModule, material_1.MatCardModule, material_1.MatCheckboxModule, material_1.MatChipsModule, material_1.MatDatepickerModule,
                material_1.MatDialogModule, material_1.MatDividerModule, material_1.MatExpansionModule, material_1.MatFormFieldModule, material_1.MatGridListModule,
                material_1.MatIconModule, material_1.MatInputModule, material_1.MatListModule, material_1.MatMenuModule, material_1.MatPaginatorModule,
                material_1.MatProgressBarModule, material_1.MatProgressSpinnerModule, material_1.MatRadioModule, material_1.MatRippleModule, material_1.MatSelectModule,
                material_1.MatSidenavModule, material_1.MatSliderModule, material_1.MatSlideToggleModule, material_1.MatSnackBarModule, material_1.MatSortModule,
                material_1.MatStepperModule, material_1.MatTableModule, material_1.MatTabsModule, material_1.MatToolbarModule, material_1.MatTooltipModule, material_1.MatTreeModule
            ],
            providers: [services_1.InvestmentFundService, services_1.SignalRHubService, services_1.UserService, services_1.ConnectionResolver],
            bootstrap: [app_component_1.AppComponent],
            entryComponents: [requestform_component_1.RequestformComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map