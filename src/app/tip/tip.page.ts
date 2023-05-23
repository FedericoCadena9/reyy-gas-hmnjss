import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.page.html',
  styleUrls: ['./tip.page.scss'],
})
export class TipPage implements OnInit {
  tipId: any;
  tip: any;
  public loaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.tipId = this.activatedRoute.snapshot.paramMap.get('id');

    this.clientService.getTip(this.tipId).subscribe((res) => {
      this.tip = res;
      this.loaded = true;
    });
  }
}
