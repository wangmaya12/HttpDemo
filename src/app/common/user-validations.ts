import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UserValidations {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }
  static oldPasswordShouldbeValid(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      if (control.value === '1234') resolve(null);
      else resolve({ oldPasswordShouldbeValid: true });
    });
  }

  static passwordShouldMatch(
    control: AbstractControl
  ): ValidationErrors | null {
    const npassword = control.get('newpassword').value;
    const cpassword = control.get('confirmpassword').value;
    if (npassword !== cpassword) {
      return { passwordShouldMatch: true };
    }
    return null;
  }
}
