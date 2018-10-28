import { InvestmentFundContribution } from "./InvestmentFundContribution";


export class InvestmentFund {
    investmentFundId: string;
    fundTitle: string;
    fundDescription: string;
    maximumValue: number;
    currentTotal: number;
    contribution: InvestmentFundContribution;
}

