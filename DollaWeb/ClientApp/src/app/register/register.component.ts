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

    /*
    create() {

        this.length = this.upper = this.lower = this.number = false;

        this.loginService.register(this.Username, this.Password)
            .subscribe(
                () => {
                    this.loginService.login(this.Username, this.Password).subscribe(
                        () => this.router.navigateByUrl('/'),
                        () => this.router.navigateByUrl('/user/login')
                    )
                },
                (res) => {
                    let obj = res.error;
                    this.length = obj.length;
                    this.upper = obj.upper;
                    this.lower = obj.lower;
                    this.number = obj.number;
                    this.duplicate = obj.duplicate;
                }
            );
    }
    */

    public register(): void {

        let myUser = { Email: this.Email, UserName: this.Username, Password: this.Password };
        this.loginService.register(myUser);

        //.subscribe(errors => { this.errorsInterface = errors; });
        //console.log(this.errorsInterface.length);
        //if (this.errorsInterface.length == 0) {
        //    this.router.navigate(['Login']);
        // }

    }

}
