import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'signform',
  templateUrl: './signform.component.html',
  styleUrls: ['./signform.component.css'],
})
export class SignformComponent implements OnInit {
  form: any;
  constructor(fb: FormBuilder, private router: Router) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  signup(x) {
    console.log(x);
    this.router.navigate(['/home']);
  }
  ngOnInit(): void {}
}
