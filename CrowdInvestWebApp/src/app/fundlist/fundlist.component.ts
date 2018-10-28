import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRHubService, InvestmentFundService } from "@app/services";
import { InvestmentFund, InvestmentFundContribution } from "@app/models";
//import { FundDetailComponent } from "@app/funddetail/funddetail.component";

@Component({
  selector: 'app-fundlist',
  templateUrl: './fundlist.component.html',
  styleUrls: ['./fundlist.component.css']
})
export class FundlistComponent implements OnInit, OnDestroy {

    constructor(private hub: SignalRHubService,
        private fundService: InvestmentFundService) {
         
    }
    
    investmentFunds: InvestmentFund[] = [];
    subscription: any;

    async ngOnInit() {
        this.investmentFunds = await this.fundService.getAllInvestmentFunds();
        const investmentFundContributions = await this.fundService.getAllInvestmentFundContributions();

        investmentFundContributions.forEach((contribution) => {
            const fund = this.investmentFunds.find((f) => f.investmentFundId === contribution.investmentFundId);
            if (fund === undefined || fund === null) {
                return;
            }
            fund.contribution = contribution;
        });

        this.subscription = this.hub.fundChanged$.subscribe((fund) => this.updateFund(fund));
    }


    async ngOnDestroy() {
        if (this.subscription !== null) {
            this.subscription.unsubscribe();
        }
    }

    private updateFund(updated: InvestmentFund): void {
        const original = this.investmentFunds
            .find((f) => f.investmentFundId === updated.investmentFundId);
        original.currentTotal = updated.currentTotal;
    }

}
