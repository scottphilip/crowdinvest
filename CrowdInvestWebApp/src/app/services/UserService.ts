import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { Subject, Observable } from "rxjs";
import { environment } from "@env/environment";

import { User } from "@app/models";
import { SignalRHubService} from "./SignalRHubService";

@Injectable()
export class UserService {
    
    constructor(private hub: SignalRHubService) {
        try {
            this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        } catch (e) {} 
    }

    private currentUser: User;

    async setCurrentUser(user: User) : Promise<User> {
        this.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
        return user;
    }

    async getCurrentUser(): Promise<User> {
        
        if (this.currentUser === null || this.currentUser === undefined) {
            await this.getRandomUser();
        }

        return this.currentUser;
    }

    private async getRandomUser() : Promise<User> {
        return this.setCurrentUser(await this.getRandomProfile());
    }

    async getRandomProfile(): Promise<User> {
        return await (await this.hub.connection()).invoke("GetRandomProfile");
    }
}
