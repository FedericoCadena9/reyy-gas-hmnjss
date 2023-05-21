import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canLoad(): Observable<any> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null), 
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
          // return false;
        } else {
          return true;
        }
      })
    );
  }
}
