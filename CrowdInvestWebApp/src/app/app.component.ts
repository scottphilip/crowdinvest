import { Component, OnInit } from '@angular/core';
import { UserService } from "./services";
import {FormControl, Validators} from '@angular/forms';
import {User} from '@app/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private userService: UserService) {
    }

    user: User;

    async ngOnInit() {
        this.user = await this.userService.getCurrentUser();
    }
}
