import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { ignoreElements, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserState } from 'src/app/store/state/user.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login Form';
  loginForm!: FormGroup;
  submitted = false;
  result!: any;
  error!: any;

  @Select(UserState.getUser) user$!: Observable<User>;
  @Select(UserState.getError) err$!: Observable<User>;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        name: new FormControl('', {
          validators: [
            Validators.required,
            Validators.maxLength(20)
          ],
          updateOn: 'blur'
        }),
        password: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{6,}$")
          ],
          updateOn: 'blur'
        })
      }
    )


  }

  onFormSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    }

    this.getUser();

    const name = this.result.firstName + " " + this.result.lastName;

    if ((this.loginForm.get('name')?.value == name) && (this.loginForm.get('password')?.value == this.result.password)) {
      this.store.dispatch(new Navigate(['/loginSuccess']));
    }
    else {
      this.error = 'Incorrect Username or Password.'
      // alert(this.error);
    }

  }

  getUser() {
    this.user$.subscribe((res) => {
      this.result = res;
      console.log(res);
      
    })
  }

  getError() {
    this.err$.subscribe(
      e => {
        this.error = e;

      }
    )
  }
}
