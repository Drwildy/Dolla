import { Component, OnInit, NgModule } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { NavbarService } from '../navbar.service';
import { LoginService } from '../login/login.service';
import { ErrorRInterface } from './ErrorRInterface';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public frmRegister: FormGroup;
    public Email: string;
    public Username: string;
    public Password: string;
    public errorsInterface: ErrorRInterface[] = [];


    length: boolean = false;
    upper: boolean = false;
    lower: boolean = false;
    number: boolean = false;
    duplicate: boolean = false;

    constructor(private fb: FormBuilder, public nav: NavbarService, private loginService: LoginService, private router: Router) { this.frmRegister= this.createRegisterForm();}

  ngOnInit() {this.nav.hide();}

    createRegisterForm(): FormGroup {
        return this.fb.group(
            {
                password: [
                    null,
                    Validators.compose([
                        Validators.required,
                        // check whether the entered password has a number
                        CustomValidators.patternValidator(/\d/, {
                            hasNumber: true
                        }),
                        // check whether the entered password has upper case letter
                        CustomValidators.patternValidator(/[A-Z]/, {
                            hasCapitalCase: true
                        }),
                        // check whether the entered password has a lower case letter
                        CustomValidators.patternValidator(/[a-z]/, {
                            hasSmallCase: true
                        }),
                        // check whether the entered password has a special character

                        //Add if you want special character check
                        /*CustomValidators.patternValidator(
                          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                          {
                            hasSpecialCharacters: true
                          }
                        ),
                        */
                        Validators.minLength(8)
                    ])
                ],
                confirmPassword: [null, Validators.compose([Validators.required])]
            },
            {
                // check whether our password and confirm password match
                validator: CustomValidators.passwordMatchValidator
            }
        );
    }

    register() {
        let myUser = { Email: this.Email, UserName: this.Username, Password: this.frmRegister.value.confirmPassword };
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
