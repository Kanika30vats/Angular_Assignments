import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControlOptions } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { UserService } from 'src/app/service/user.service';
import { AddUser } from 'src/app/store/action/user.action';
import * as moment from 'moment';
import { nameValidator } from 'src/app/shared/name.validator';
import { UserState } from 'src/app/store/state/user.state';
import { last, Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = 'Registration Form';
  registrationForm!: FormGroup;
  submitted = false;
  err!: any;
  // month!: any[];
  year!: any[];
  date!: any[];
  lastDay!: any;
  monthSelectedValue!: any;
  yearSelectedValue!: any;

  @Select(UserState.getError) err$!: Observable<User>;

  month = moment.months();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private store: Store
  ) { }

  ngOnInit(): void {


    const formValidators: AbstractControlOptions = {
      validators: [nameValidator]
    };

    this.registrationForm = this.formBuilder.group(
      {
        firstName: new FormControl('', {
          validators: [
            Validators.required,
            Validators.maxLength(20)
          ],
          updateOn: 'blur'
        }),
        lastName: new FormControl('', {
          validators: [
            Validators.required,
            Validators.maxLength(20)
          ],
          updateOn: 'blur'
        }),
        dateVal: new FormGroup({
          year: new FormControl('2002', {
            validators: [
              Validators.required
            ],
            updateOn: 'blur'
          }),
          month: new FormControl('', {
            validators: [
              Validators.required
            ],
            updateOn: 'blur'
          }),
          date: new FormControl('', {
            validators: [
              Validators.required
            ],
          updateOn: 'blur'
          })
        }),
        gender: new FormControl('', {
          validators: [
            Validators.required
          ],
          updateOn: 'blur'
        }),
        zipcode1: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3),
            Validators.pattern("^[0-9]*$")
          ],
          updateOn: 'blur'
        }),
        zipcode2: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.pattern("^[0-9]*$")
          ],
          updateOn: 'blur'
        }),
        countryCode: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3),
            Validators.pattern("^0[0-9].*$")
          ],
          updateOn: 'blur'
        }),
        phone1: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
            Validators.pattern("^[1-9][0-9]*$")
          ],
          updateOn: 'blur'
        }),
        phone2: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.pattern("[0-9]*?[1-9][0-9]*")
          ],
          updateOn: 'blur'
        }),
        townName: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
          ],
          updateOn: 'blur'
        }),
        cityName: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10)
          ],
          updateOn: 'blur'
        }),
        email: new FormControl('', {
          validators: [
            Validators.required,
            Validators.email
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
        }),
        checkbox: new FormControl('',
          Validators.required
        )
      },
      formValidators
    );

    
    this.getYear();

    this.getDate("2002-01");
    


  }


  onFormSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {

      this.registrationForm.markAllAsTouched();
      return
    }

    this.addUserToState();
    console.log(this.registrationForm.value);
    

    if (this.getError()) {
      alert(this.err);
    } else {
      this.store.dispatch(new Navigate(['/registerSuccess']));
    }



  }

  getUserSessionData() {
    this.userService.getUser();
  }

  addUserToState() {
    this.store.dispatch(new AddUser(this.registrationForm.value));
  }

  getError() {
    this.err$.subscribe(
      e => {
        this.err = e;
      }
    )
    return this.err;
  }

  getYear() {
    const years = (back: any) => {
      const year = new Date().getFullYear();
      return Array.from({ length: back }, (v, i) => year - back + i + 1 - 20);
    }
    this.year = years(70);
  }

  getMonth() {
    this.month = moment.months();
  }

  

  getDate(month: any) {

    const daysInMonth = moment(month).daysInMonth();
    this.date = Array.from({ length: daysInMonth }, (v, k) => k + 1)
    console.log(this.date);

  }

  getMonthVal(monthVal: any) {
    monthVal = parseInt(monthVal) + 1;
    this.monthSelectedValue = monthVal + "";

    var yearMonth = this.yearSelectedValue + "-" + this.monthSelectedValue;
    this.getDate(yearMonth);

  }

  getYearVal(yearVal: any) {
    this.yearSelectedValue = yearVal;

  }


}
