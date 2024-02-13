import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const authToken =localStorage.getItem('token')
    if (authToken) {
      if (localStorage.getItem('role')=='Administrador'||localStorage.getItem('role')=='SuperAdmin') {
        this.router.navigate(['/usuarios']);
      }
      if (localStorage.getItem('role')=='Capturista') {
        this.router.navigate(['/usuarios']);
      }
      return true;
    } else {

      // Si el token no existe, redirige a la página de inicio de sesión o a otra página
      // this.router.navigate(['/autenticacion/iniciosesion']); // Cambia '/login' al enrutamiento que desees
      return true;
    }
  }
}