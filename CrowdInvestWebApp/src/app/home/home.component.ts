import { Component, OnInit } from '@angular/core';
import { UserService } from "@app/services";
import { User } from '@app/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    constructor(private userService: UserService) {
    }

    user: User;

    async ngOnInit() {
        this.user = await this.userService.getCurrentUser();
    }

}
