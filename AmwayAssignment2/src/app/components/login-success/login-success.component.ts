import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { GetUser } from 'src/app/store/action/user.action';
import { UserState } from 'src/app/store/state/user.state';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css']
})
export class LoginSuccessComponent implements OnInit {

  @Select(UserState.getUser) user$!: Observable<User>;
  @Select(UserState.getUserFromAPI) result$!: Observable<User>;
  @Select(UserState.getError) err$!: Observable<User>;

  error!: any;
  result!:any;
  isError= false;
  
  constructor(private store: Store) { }

  ngOnInit(): void {

    this.store.dispatch(new GetUser);
    this.getUserFromAPI();
    if(this.result == null) {
      this.isError= true;
      this.getError();
      this.error = "Data not accessible.";
    }else{
      this.getUser();
    }
  }

  getError() {
    this.err$.subscribe(
      e => {
        this.error = e;

      }
    )
  }

  getUser() {
    this.user$.subscribe((res) => {
      this.result = res;
      
    })
  }

  getUserFromAPI() {
    this.result$.subscribe((res) => {
      this.result = res;
      
    })
  }

}
