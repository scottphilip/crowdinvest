"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var models_1 = require("@app/models");
var requestform_component_1 = require("@app/requestform/requestform.component");
var FundDetailComponent = /** @class */ (function () {
    function FundDetailComponent(dialog) {
        this.dialog = dialog;
    }
    FundDetailComponent.prototype.ngOnInit = function () {
    };
    FundDetailComponent.prototype.showFundRequestDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(requestform_component_1.RequestformComponent, {
            width: "500px",
            height: "300px",
            autoFocus: true,
            data: this.fund
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result !== null && result.result === models_1.UserInvestmentResultType.Pass) {
                _this.fund.contribution = result.contribution;
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", models_1.InvestmentFund)
    ], FundDetailComponent.prototype, "fund", void 0);
    FundDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-funddetail',
            templateUrl: './funddetail.component.html',
            styleUrls: ['./funddetail.component.css']
        }),
        __metadata("design:paramtypes", [material_1.MatDialog])
    ], FundDetailComponent);
    return FundDetailComponent;
}());
exports.FundDetailComponent = FundDetailComponent;
//# sourceMappingURL=funddetail.component.js.map