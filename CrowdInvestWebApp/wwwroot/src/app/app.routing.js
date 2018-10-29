"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var ConnectionResolver_1 = require("./services/ConnectionResolver");
var home_component_1 = require("./home/home.component");
var appRoutes = [
    {
        path: "",
        component: home_component_1.HomeComponent,
        resolve: {
            connection: ConnectionResolver_1.ConnectionResolver
        }
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map