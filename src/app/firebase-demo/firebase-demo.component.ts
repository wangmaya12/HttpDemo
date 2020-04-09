import { Component, OnInit } from '@angular/core';
import { FireBaseService } from '../fire-base.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/Notfound-error';
import { Observable, throwError } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'firebase-demo',
  templateUrl: './firebase-demo.component.html',
  styleUrls: ['./firebase-demo.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [style({ opacity: 0 }), animate('1000ms')]),
      transition(':leave', [animate('1000ms', style({ opacity: 0 }))]),
    ]),
    trigger('fade', [
      transition('void=>*', [
        style({
          backgroundColor: 'orange',
          opacity: 0,
        }),
        animate(1000),
      ]),
      transition('*=>void', [
        animate(1000, style({ backgroundColor: 'orange', opacity: 0 })),
      ]),
    ]),
    trigger('slide', [
      transition('void=>*', [
        style({
          backgroundColor: 'pink',
          opacity: 0,
          transform: 'translateX(-20px)',
        }),
        animate(1000),
      ]),
    ]),
  ],
})
export class FirebaseDemoComponent implements OnInit {
  courses: any;
  //courseName: string;
  constructor(private service: FireBaseService) {}
  ngOnInit(): void {
    this.service.read_Courses().subscribe(
      (data) => {
        this.courses = data.map((e) => {
          return {
            id: e.payload.doc.id,
            Name: e.payload.doc.data()['Name'],
          };
        });
        console.log(this.courses);
      },
      (error) => {
        alert('An Unexpected Error Occured.');
        console.log(error);
      }
    );
  }
  CreateRecord(course: HTMLInputElement) {
    let record = {};
    record['Name'] = course.value;
    this.service
      .create_NewCourse(record)
      .then((resp) => {
        course.value = '';
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = 'SharePoint';
    this.service.update_Course(recordRow.id, record);
  }
  RemoveRecord(rowID) {
    this.service.delete_Course(rowID).catch((error: AppError) => {
      if (error instanceof NotFoundError) {
        alert('Post has altready been deleted');
      } else {
        alert('Unexpected error occuered');
      }
    });
  }
}
