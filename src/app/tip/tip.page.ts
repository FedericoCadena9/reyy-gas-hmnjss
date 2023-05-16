import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.page.html',
  styleUrls: ['./tip.page.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class TipPage implements OnInit {
  tipId: any;
  tip: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.tipId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getTip().subscribe((res) => {
      this.tip = res[this.tipId - 1];
    });
  }

  //Función para obtener el tip seleccionado
  getTip() {
    return this.http.get('assets/db/tips.json').pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}
