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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var models_1 = require("@app/models");
var services_1 = require("@app/services");
var RequestformComponent = /** @class */ (function () {
    function RequestformComponent(hub, fundService, formBuilder, dialogRef, data) {
        this.hub = hub;
        this.fundService = fundService;
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
        this.data = data;
        this.errorMessage = "";
        this.isSubmitted = false;
        this.isWorking = false;
        this.fund = data;
    }
    RequestformComponent.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            value: ["", forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.min(100), forms_1.Validators.max(10000)])]
        });
    };
    RequestformComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    Object.defineProperty(RequestformComponent.prototype, "f", {
        get: function () { return this.form.controls; },
        enumerable: true,
        configurable: true
    });
    // TODO: Handle timeouts for when the service doesn't call back in a timely manner
    RequestformComponent.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isSubmitted = true;
                        if (this.form.invalid) {
                            return [2 /*return*/];
                        }
                        this.isWorking = true;
                        this.form.disable();
                        this.dialogRef.disableClose = true;
                        this.subscription = this.hub.requestComplete$.subscribe(function (result) { return _this.handleResult(result); });
                        return [4 /*yield*/, this.fundService.sendFundContributionRequest(this.fund.investmentFundId, this.f["value"].value)];
                    case 1:
                        request = _a.sent();
                        this.requestId = request.requestId;
                        return [2 /*return*/];
                }
            });
        });
    };
    RequestformComponent.prototype.handleResult = function (result) {
        if (result.requestId !== this.requestId)
            return;
        if (result.result === models_1.UserInvestmentResultType.Pass) {
            this.dialogRef.close(result);
            return;
        }
        this.isWorking = false;
        this.dialogRef.disableClose = false;
        if (result.result === models_1.UserInvestmentResultType.FailDuplicate) {
            this.errorMessage = "Sorry, you are already a member of this fund";
        }
        else if (result.result === models_1.UserInvestmentResultType.FailBalance) {
            this.errorMessage = "Sorry, together your contribution and the balance is above the maximum for this fund";
        }
        else {
            this.errorMessage = "Sorry, an unknown error has occurred";
        }
    };
    RequestformComponent = __decorate([
        core_1.Component({
            selector: 'app-requestform',
            templateUrl: './requestform.component.html',
            styleUrls: ['./requestform.component.css']
        }),
        __param(4, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [services_1.SignalRHubService,
            services_1.InvestmentFundService,
            forms_1.FormBuilder,
            material_1.MatDialogRef,
            models_1.InvestmentFund])
    ], RequestformComponent);
    return RequestformComponent;
}());
exports.RequestformComponent = RequestformComponent;
//# sourceMappingURL=requestform.component.js.map