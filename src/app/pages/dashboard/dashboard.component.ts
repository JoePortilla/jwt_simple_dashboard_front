import {Component, OnDestroy} from '@angular/core';
import {LoginService} from "../../services/auth/login.service";
import {User} from "../../services/auth/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnDestroy {
  userLoginOn: boolean = false;
  userData?: User;

  constructor(private loginService: LoginService) {
  }

  ngOnDestroy() {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit() {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      });

    this.loginService.currentUserData.subscribe(
      {
        next: (userData) => {
          this.userData = userData;
        }
      }
    )

  }
}
