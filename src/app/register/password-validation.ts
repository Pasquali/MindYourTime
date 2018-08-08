import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value; // to get value in input tag
       const confirm_password = AC.get('confirm_password').value; // to get value in input tag
        if (password !== confirm_password) {
            AC.get('confirm_password').setErrors( {MatchPassword: true} );
            AC.get('password').setErrors( {MatchPassword: true} );
        } else {
            AC.get('confirm_password').setErrors( null );
            AC.get('password').setErrors( null );
        }
    }
}
