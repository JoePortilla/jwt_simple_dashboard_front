import {Component, OnDestroy} from '@angular/core';
import {LoginService} from "../../services/auth/login.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnDestroy {
  userLoginOn: boolean = false;

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
      }
    )
  }

}
