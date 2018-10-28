import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { Subject, Observable } from "rxjs";
import { environment } from "@env/environment";

import { InvestmentRequestResult, InvestmentFund } from "@app/models";

@Injectable({ providedIn: "root" })
export class SignalRHubService {
    
    constructor() { }

    private fundChanged = new Subject<InvestmentFund>();
    fundChanged$ = this.fundChanged.asObservable();

    private requestComplete = new Subject<InvestmentRequestResult>();
    requestComplete$ = this.requestComplete.asObservable();
    
    private hubConnection: HubConnection;
    isHubConnected = false;
    
    private createConnection() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(environment.hubPath)
            .build();
    }

    async connection() : Promise<HubConnection> {

        if (this.isHubConnected) {
            return this.hubConnection;
        }

        this.createConnection();
        this.registerOnServerEvents();

        try {

            await this.hubConnection.start();
            this.isHubConnected = true;

        } catch (e) {

            this.isHubConnected = false;
            console.warn("SignalRError", e);
            throw "Connection Error";
        }

        return this.hubConnection;
    }

    private registerOnServerEvents(): void {
		
        this.hubConnection.onclose(() => {
            this.isHubConnected = false;
        });

        this.hubConnection.on("OnFundChanged", (fund: any) => {
            this.fundChanged.next(fund);
        });

        this.hubConnection.on("OnRequestComplete", (result: InvestmentRequestResult) => {
            this.requestComplete.next(result);
        });

    }
}
