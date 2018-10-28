import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserInvestmentRequest, UserInvestmentResultType, InvestmentRequestResult, InvestmentFund } from "@app/models";
import { InvestmentFundService, SignalRHubService } from "@app/services";

@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.css']
})
export class RequestformComponent implements OnInit, OnDestroy {

    constructor(
        private hub: SignalRHubService,
        private fundService: InvestmentFundService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<RequestformComponent>,
        @Inject(MAT_DIALOG_DATA) public data: InvestmentFund
    ) {
        this.fund = data;
    }

    form: FormGroup;
    errorMessage: string = "";
    isSubmitted = false;
    isWorking = false;
    fund: InvestmentFund;
    private subscription: any;
    private requestId: string;
    
    ngOnInit() {
        this.form = this.formBuilder.group({
            value: ["", Validators.compose([Validators.required, Validators.min(100), Validators.max(10000)])]
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    get f() { return this.form.controls; }

    // TODO: Handle timeouts for when the service doesn't call back in a timely manner
    async onSubmit() {
        
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }

        this.isWorking = true;
        this.form.disable();
        this.dialogRef.disableClose = true;

        this.subscription = this.hub.requestComplete$.subscribe((result) => this.handleResult(result));
        
        const request = await this.fundService.sendFundContributionRequest(
            this.fund.investmentFundId, this.f["value"].value);

        this.requestId = request.requestId;
    }

    private handleResult(result: InvestmentRequestResult) {

        if (result.requestId !== this.requestId) return;

        if (result.result === UserInvestmentResultType.Pass) {
            this.dialogRef.close(result);
            return;
        }

        this.isWorking = false;
        this.dialogRef.disableClose = false;

        if (result.result === UserInvestmentResultType.FailDuplicate) {
            this.errorMessage = "Sorry, you are already a member of this fund";
        } else if (result.result === UserInvestmentResultType.FailBalance) {
            this.errorMessage = "Sorry, together your contribution and the balance is above the maximum for this fund";
        } else {
            this.errorMessage = "Sorry, an unknown error has occurred";
        }
    }
    
}
