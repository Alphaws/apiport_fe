import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import {environment} from '../../environments/environment';

export interface RegisterRequest {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export interface AuthResponse {
  message: string;
  user?: User;
}

export interface UserResponse {
  user: User;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.getApiUrl();
  private readonly STORAGE_KEY = 'current_user';
  private platformId = inject(PLATFORM_ID);

  // Signal for current user
  private currentUserSignal = signal<User | null>(null);

  // Computed signals
  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => this.currentUserSignal() !== null);
  isSuperAdmin = computed(() => {
    const user = this.currentUserSignal();
    return user?.is_superuser || false;
  });
  isStaff = computed(() => {
    const user = this.currentUserSignal();
    return user?.is_staff || false;
  });
  userDisplayName = computed(() => {
    const user = this.currentUserSignal();
    if (!user) return '';
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user.first_name) return user.first_name;
    return user.email;
  });
  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/accounts/register/`, user, {
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response.user) {
          this.setCurrentUser(response.user);
        }
      })
    );
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    console.log(this.apiUrl + ' login');
    return this.http.post<AuthResponse>(`${this.apiUrl}/accounts/login/`, credentials, {
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response.user) {
          this.setCurrentUser(response.user);
        }
      })
    );
  }

  logout(): Observable<any> {
    console.log(this.apiUrl + ' logout');
    return this.http.post(`${this.apiUrl}/logout/`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.clearCurrentUser();
      }),
      catchError(() => {
        // Even if request fails, clear local state
        this.clearCurrentUser();
        return of({ message: 'Logged out locally' });
      })
    );
  }

  getCurrentUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/me/`, {
      withCredentials: true
    }).pipe(
      tap(response => {
        if (response.user) {
          this.setCurrentUser(response.user);
        }
      }),
      catchError(() => {
        this.clearCurrentUser();
        return of({ user: null as any });
      })
    );
  }

  loadUser(): Observable<UserResponse> {
    return this.getCurrentUser();
  }

  setUser(user: User): void {
    this.setCurrentUser(user);
  }

  private setCurrentUser(user: User): void {
    this.currentUserSignal.set(user);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }
  }

  private clearCurrentUser(): void {
    this.currentUserSignal.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  private loadUserFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem(this.STORAGE_KEY);
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          this.currentUserSignal.set(user);
        } catch (e) {
          localStorage.removeItem(this.STORAGE_KEY);
        }
      }
    }
  }

}
