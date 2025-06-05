// src/main.ts

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { routes }       from './app/app.routes';

// Import AuthInterceptor bạn đã tạo



// 1) Import các symbols để cấu hình locale Việt Nam cho Ng-Zorro
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
// 2) Import locale data gốc của Angular cho tiếng Việt
import vi from '@angular/common/locales/vi';
import { AuthInterceptor } from './app/auth.interceptor';
import { environment } from './app/environments/environment.development';

if (environment.production) {
  enableProdMode();
}

// Đăng ký locale data của Angular cho 'vi'
registerLocaleData(vi);

bootstrapApplication(AppComponent, {
  providers: [
    // HttpClientModule để có HttpClient khắp ứng dụng
    importProvidersFrom(HttpClientModule),

    // Router nếu bạn có routing
    provideRouter(routes),

    // Hoạt hóa animations (cần nếu bạn dùng ng-zorro-antd)
    provideAnimations(),

    // Đăng ký AuthInterceptor để tự thêm header Authorization
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    // 3) Đăng ký NZ_I18N với giá trị vi_VN để Ng-Zorro dùng tiếng Việt
    { provide: NZ_I18N, useValue: vi_VN }

    // Nếu còn provider khác (StoreModule, FormBuilder, v.v.), add vào đây.
  ]
})
.catch(err => console.error(err));
