import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Tweet} from '@app/_models/tweet';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TweetService {

  constructor(private http: HttpClient) {}

  getTweeters(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(`${environment.apiUrl}/tweets/db`);
  }

}
