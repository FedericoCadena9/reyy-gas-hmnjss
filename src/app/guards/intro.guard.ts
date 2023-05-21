import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const INTRO_KEY = 'intro-seen';

import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanLoad {

  constructor(
    private router: Router,
  ) {}


  async canLoad(): Promise<boolean> {
    const introSeen = Preferences.get({ key: INTRO_KEY });

    if (introSeen && (await introSeen).value === 'true') {
      return Promise.resolve(true);
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return Promise.resolve(false);
    }
  }
}
