import { Component, OnInit } from '@angular/core';
import {Tweet} from '@app/_models/tweet';
import {TweetService} from '@app/_services/tweet.service';
import {first} from 'rxjs/operators';



@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
})

export class TweetsComponent implements OnInit {
  tweets: Tweet[] = [];

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
     return this.tweetService.getTweeters().pipe(first()).subscribe(tweets => {
      this.tweets = tweets;
    });
  }
}
