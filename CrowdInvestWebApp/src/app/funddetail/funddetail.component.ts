import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { InvestmentFund, InvestmentRequestResult, UserInvestmentResultType } from "@app/models";
import { RequestformComponent } from "@app/requestform/requestform.component";

@Component({
  selector: 'app-funddetail',
  templateUrl: './funddetail.component.html',
  styleUrls: ['./funddetail.component.css']
})
export class FundDetailComponent implements OnInit {
    
    constructor(private dialog: MatDialog) { }
    
    @Input() fund: InvestmentFund;

    ngOnInit() {
    }
    
    showFundRequestDialog() {

        const dialogRef = this.dialog.open(RequestformComponent,
            {
                width: "500px",
                height: "300px",
                autoFocus: true,
                data: this.fund
            });

        dialogRef.afterClosed().subscribe((result: InvestmentRequestResult) => {
            if (result !== null && result.result === UserInvestmentResultType.Pass) {
                this.fund.contribution = result.contribution;
            }
        });
    }
}
