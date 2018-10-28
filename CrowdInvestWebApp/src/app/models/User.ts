import {InvestmentFundContribution as UserInvestment} from "@app/models/InvestmentFundContribution";

export class User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    investments: UserInvestment[] = [];
}
