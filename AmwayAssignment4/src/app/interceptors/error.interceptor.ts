import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Server response');
    
    // const request1 = request.clone({
    //   params: request.params.append("params added", "params appended")
    // })
    return next.handle(request).pipe(
      catchError((error) => {
        console.log(`error status : ${error.status} ${error.statusText}`);
        return throwError(error);
      })
      )

    // return next.handle(request).pipe(
    //   catchError((error) => {
 
    //     let handled: boolean = false;
    //     // console.error(error);
    //     if (error instanceof HttpErrorResponse) {
    //       if (error.error instanceof ErrorEvent) {
    //         console.error("Error Event");
    //       } else {
    //         console.log(`error status : ${error.status} ${error.statusText}`);
    //         switch (error.status) {
    //           case 401:      
    //             console.log(`401`);
    //             handled = true;
    //             break;
    //           case 403:  
    //             console.log(`403`);
    //             handled = true;
    //             break;
    //         }
    //       }
    //     }
    //     else {
    //       console.error("Other Errors");
    //     }
 
    //     if (handled) {
    //       console.log('return back ');
    //       return of(error);
    //     } else {
    //       console.log('throw error back to to the subscriber');
    //       return throwError(error);
    //     }
 
    //   })
    // )

    
  }

}
