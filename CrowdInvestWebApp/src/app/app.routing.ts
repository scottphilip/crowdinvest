import { Routes, RouterModule } from "@angular/router";
import { ConnectionResolver } from "./services/ConnectionResolver";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
    {
         path: "",
         component: HomeComponent,
        resolve: {
            connection: ConnectionResolver
        }
    }
];

export const routing = RouterModule.forRoot(appRoutes); 
