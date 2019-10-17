import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { LoginService } from './login.service';
import { ErrorLInterface } from './ErrorL.interface';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public UserName: string;
    public Password: string;
    public err: ErrorLInterface;
    public succeeded: string;
    public rememberMe: boolean;

    constructor(public nav: NavbarService, private activeRoute: ActivatedRoute, private loginService: LoginService, private router: Router ) { }

  ngOnInit() {
      this.nav.hide();
      //this.nav.show();
    }

    public signIn(): void {

        let myUser = { UserName: this.UserName, Password: this.Password, rememberMe: this.rememberMe };
        console.log(myUser);
        this.loginService.signIn(myUser)
            .subscribe(
                result => {
                    console.log(result);
                    this.nav.show();
                    this.router.navigateByUrl(`/`);
                },
                error => {
                    console.log(error);
                    //Display Failed to log in on screen
                }
            );
    }


   
}
