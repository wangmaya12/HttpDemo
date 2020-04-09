import { ErrorHandler } from '@angular/core';

export class ErrorsHandler implements ErrorHandler {
  handleError(error: Error) {
    // Do whatever you like with the error (send it to the server?)
    // And log it to the console
    console.error('It happens: ', error.message);
    alert('An unexpected error occured.');
  }
}
