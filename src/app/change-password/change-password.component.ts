import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserValidations } from '../common/user-validations';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  f: any;
  constructor(fb: FormBuilder) {
    this.f = fb.group(
      {
        oldpassword: new FormControl(
          '',
          Validators.required,
          UserValidations.oldPasswordShouldbeValid
        ),
        newpassword: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})'
          ),
        ]),
        confirmpassword: new FormControl('', Validators.required),
      },
      { validator: UserValidations.passwordShouldMatch }
    );
  }
  get oldpassword() {
    return this.f.get('oldpassword');
  }
  get newpassword() {
    return this.f.get('newpassword');
  }
  get confirmpassword() {
    return this.f.get('confirmpassword');
  }
  changePassword(f: any) {
    console.log(f);
  }
  ngOnInit() {}
}
