import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { INTRO_KEY } from '../guards/intro.guard';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router) {}

  ngOnInit() {}

  next() {
    this.slides.slideNext();
  }

  async start() {
    await Preferences.set({ key: INTRO_KEY, value: 'true' });
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
