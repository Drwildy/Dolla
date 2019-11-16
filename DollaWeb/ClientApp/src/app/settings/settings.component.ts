import { Component, OnInit, NgModule } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';
import { NavbarService } from '../navbar.service';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    public frmSignup: FormGroup;
    public newPass: string;
    public currentPass: string;
    bad: boolean = false;

    constructor(private router: Router, public nav: NavbarService, private fb: FormBuilder, private settingsService: SettingsService) {
    this.frmSignup = this.createSignupForm();
    }

  ngOnInit(){}

  createSignupForm(): FormGroup {
    return this.fb.group(
        {
        password2: [
          null,
          Validators.compose([ Validators.required])
        ],
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

  changePass() {
      // do signup or something
      this.newPass = this.frmSignup.value.confirmPassword;
      this.currentPass = this.frmSignup.value.password2;

      let myPass = { newPass: this.newPass, currentPass: this.currentPass}

      this.settingsService.changePass(myPass)
          .subscribe(
              result => {
                  this.nav.hide();
                  this.router.navigateByUrl(`/login`);
              },
              error => {
                  console.log(error);
                  this.bad = true;
              }
          );

  }
}
