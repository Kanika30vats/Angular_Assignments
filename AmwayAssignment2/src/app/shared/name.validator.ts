import { AbstractControl } from "@angular/forms";

export function nameValidator(control: AbstractControl): any {
   
    const first = control.get('firstName')?.value;
    const second = control.get('lastName')?.value;

    // if ((first.length + second.length) <= 27) {
    //     return { 'lengthError': false };
    // } else {
    //     return { 'lengthError': true };
    // }

    if ((first.length + second.length) > 27) {
        return { 'lengthError': true };
    }

}