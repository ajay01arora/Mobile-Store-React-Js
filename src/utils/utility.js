import { BehaviorSubject } from 'rxjs';

export const currentUserSubject = new BehaviorSubject(localStorage.getItem('userData'));
export const authenticationService = {

    currentUser: currentUserSubject.asObservable(),
    
    get currentUserValue () { return currentUserSubject.value }
};
