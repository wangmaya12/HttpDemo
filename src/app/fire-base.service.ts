import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { AppError } from './common/app-error';
import { NotFoundError } from './common/Notfound-error';

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {
  constructor(private firestore: AngularFirestore) {}
  create_NewCourse(record) {
    return this.firestore.collection('Courses').add(record);
  }
  read_Courses() {
    return this.firestore.collection('Courses').snapshotChanges();
  }

  update_Course(recordID, record) {
    return this.firestore.doc('Courses/' + recordID).update(record);
  }

  delete_Course(record_id) {
    return this.firestore
      .doc('Courses/' + record_id)
      .delete()
      .catch((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(new NotFoundError());
        }
        return throwError(new AppError(error));
      });
  }
}
