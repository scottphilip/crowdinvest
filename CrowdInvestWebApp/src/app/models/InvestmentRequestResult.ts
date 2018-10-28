import {UserInvestmentResultType} from "./UserInvestmentResultType";
import {InvestmentFundContribution} from "./InvestmentFundContribution";


export class InvestmentRequestResult {
    requestId: string;
    result: UserInvestmentResultType;
    contribution: InvestmentFundContribution;
}
