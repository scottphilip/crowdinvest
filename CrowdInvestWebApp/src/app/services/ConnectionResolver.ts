import { Resolve } from '@angular/router';
import { SignalRHubService } from './SignalRHubService';
import { Injectable } from '@angular/core';
import { HubConnection } from "@aspnet/signalr";

@Injectable()
export class ConnectionResolver implements Resolve<HubConnection>
{
    constructor(private hubService: SignalRHubService) {
    }

    async resolve() {
        return await this.hubService.connection();
    }

}

