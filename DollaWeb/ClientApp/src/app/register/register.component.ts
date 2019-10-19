import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { LoginService } from '../login/login.service';
import { ErrorRInterface } from './ErrorRInterface';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public Email: string;
    public Username: string;
    public Password: string;
    public errorsInterface: ErrorRInterface[] = [];


    length: boolean = false;
    upper: boolean = false;
    lower: boolean = false;
    number: boolean = false;
    duplicate: boolean = false;

  constructor( public nav: NavbarService, private loginService: LoginService, private router: Router ) { }

  ngOnInit() {
    this.nav.hide();
    }

    public register(): void {

        let myUser = { Email: this.Email, UserName: this.Username, Password: this.Password };
        this.loginService.register(myUser)
            .subscribe(result => {
                console.log(result);
                this.router.navigateByUrl(`/login`);
            },
                error => {
                    console.log(error);
                }
            );

    }

}
