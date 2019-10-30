import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';

import { MouseEvent } from '@agm/core';

import { User } from '@app/_models';
import { UserService } from '@app/_services';
import {Tweet} from '@app/_models/tweet';
import {AdminService} from '@app/_services/admin.service';


@Component({ templateUrl: 'admin.component.html',
             styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
    loading = false;
    users: User[];
    tweets: Tweet[] = [];

    // google maps zoom level
    zoom = 10;

    // initial center position for the map
    lat = 47.82130185733686;
    lng = 35.078199365234354;
    rad = 10000;
    w = '';

    constructor(private userService: UserService, private adminService: AdminService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    circleDragEnd($event: MouseEvent) {
      this.lat = $event.coords.lat;
      this.lng = $event.coords.lng;
    }

    onLatChange($lat: number) {
      this.lat = $lat;
    }

    onLngChange($lng: number) {
      this.lng = $lng;
    }

    onRadChange($rad: number) {
      this.rad = Math.round($rad);
    }

    searchTweets(lat: string, lng: string, rad: string, w: string) {
      const search = {lat, lng, rad, w};
      this.adminService.getTweets(search)
        .subscribe(tweets => this.tweets = tweets);
    }

    saveGeoTweets(lat: string, lng: string, rad: string, w: string) {
      const search = {lat, lng, rad, w};
      this.adminService.saveGeoTweets(search)
        .subscribe(data => this.tweets.push(data));
    }

    clearTweets() {
       this.lat = 47.8213;
       this.lng = 35.0781;
       this.rad = 10000;
       this.w = '';
       this.tweets = [];
    }

}
