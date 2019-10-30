import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Tweet} from '@app/_models/tweet';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  /** POST tweets from the server */
  getTweets(search): Observable<Tweet[]> {
    return this.http.post(`${environment.apiUrl}/tweets`, search, this.httpOptions).pipe(map((data: any) => {
      return data.data.statuses.map((tweet: any) => {
        return {text: tweet.text, name: tweet.user.name, location: tweet.user.location, img: tweet.user.profile_image_url};
      });
    }));
  }

  saveGeoTweets(search): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/tweets/save`, search, this.httpOptions);
  }

}
