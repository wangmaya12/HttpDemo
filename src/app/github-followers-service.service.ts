import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { NotFoundError } from './common/Notfound-error';
import { AppError } from './common/app-error';

@Injectable({
  providedIn: 'root',
})
export class GithubFollowersServiceService {
  private url = 'https://api.github.com/users/mosh-hamedani/followers';

  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(this.url).pipe(catchError(this.errorHandler));
  }

  errorHandler(
    error: HttpErrorResponse
  ): import('rxjs').OperatorFunction<Object, any> {
    if (error.status === 404) {
      throw new NotFoundError();
    } else {
      throw new AppError(error);
    }
  }
}
