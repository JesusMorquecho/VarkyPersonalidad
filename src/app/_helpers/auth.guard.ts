import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { SharedDataService } from '@app/_services/shared-data.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private sharedDataService: SharedDataService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.userValue;
        if (user) {
            // check if route is restricted by role
            const { roles } = route.data;
            if (roles && !roles.includes(user.role)) {
                // role not authorized so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // Check if both tests are completed and redirect to home if they are
            const testVarkCompleted = this.sharedDataService.getTestVarkCompleted();
            const testPersonalidadCompleted = this.sharedDataService.getTestPersonalidadCompleted();
            if (testVarkCompleted && testPersonalidadCompleted) {
                this.router.navigate(['/home']);
                return false;
            }

            // Check the individual test routes
            if (state.url.includes('test-vark') && testVarkCompleted) {
                // If trying to access VARK test but it's completed, redirect to Personalidad test or home
                this.router.navigate([testPersonalidadCompleted ? '/home' : '/test-personalidad']);
                return false;
            } else if (state.url.includes('test-personalidad') && testPersonalidadCompleted) {
                // If trying to access Personalidad test but it's completed, redirect to home
                this.router.navigate([testPersonalidadCompleted ? '' : '/test-vark']);
                return false;
            }

            // authorized so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}