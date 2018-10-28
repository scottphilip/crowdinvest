import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { Subject, Observable } from "rxjs";
import { environment } from "@env/environment";

import { InvestmentFund , UserInvestmentRequest, InvestmentFundContribution } from "@app/models";
import { SignalRHubService} from "./SignalRHubService";
import { UserService} from "./UserService";


@Injectable()
export class InvestmentFundService {
    
    constructor(private hub: SignalRHubService,
        private userService: UserService) { }

    async getAllInvestmentFunds(): Promise<InvestmentFund[]> {
        return await (await this.hub.connection()).invoke("GetAllInvestmentFunds");
    }

    async getAllInvestmentFundContributions(): Promise<InvestmentFundContribution[]> {
        const user = await this.userService.getCurrentUser();
        if (!user) return [];
        return await (await this.hub.connection())
            .invoke("GetAllInvestmentFundContributions", user.userId);
    }

    async sendFundContributionRequest(
        investmentFundId: string,
        contribution: number)
        : Promise<UserInvestmentRequest> {
        return await (await this.hub.connection())
            .invoke("CreateContributionRequest",
                (await this.userService.getCurrentUser()).userId,
                investmentFundId,
                contribution);
    }
   
}
