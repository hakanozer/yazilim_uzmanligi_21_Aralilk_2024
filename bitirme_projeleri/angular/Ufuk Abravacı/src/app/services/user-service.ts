import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { PublicUser } from "../models/User";
import { endpoints } from "../utils/apiUrl";
import { PagedResult } from "../models/PagedResult";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  private http = inject(HttpClient);

  // login sonrası kendi profilini çekmek için (sadece kendi kullanıcı bilgisi)
  getOwnProfile(id: number) {
    return this.http.get<PublicUser>(endpoints.auth.profile(id));
  }

  // bir kullanıcıyı public olarak getirmek (eğitmen bilgisi vs)
  getPublicUserById(id: number) {
    return this.http.get<PublicUser>(endpoints.users.getPublicUserById(id));
  }

  // admin için tüm user listesi (jwt token gerektirir)
  getAllUsers(
    page: number,
    limit: number
  ): Observable<PagedResult<PublicUser>> {
    return this.http
      .get<PublicUser[]>(endpoints.users.listPagination(page, limit), {
        observe: "response",
      })
      .pipe(
        map((res) => ({
          data: res.body ?? [],
          total: Number(res.headers.get("X-Total-Count") ?? 0),
        }))
      );
  }

  getInstructors(page: number = 1, limit: number = 9): Observable<PagedResult<PublicUser>> {
  return this.http.get<PublicUser[]>(endpoints.users.getInstructors(page,limit), {
    observe: 'response'
  })
  .pipe(
    map(res => ({
      data: res.body ?? [],
      total: Number(res.headers.get('X-Total-Count') ?? 0)
    }))
  );
}
}


