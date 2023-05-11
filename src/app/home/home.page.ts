import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class HomePage implements OnInit {
  
  users: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData().subscribe(res => {
      console.log(res);
      this.users = res;
    });
  }

  getData() {
    return this.http.get('assets/db/numbers.json').pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}
