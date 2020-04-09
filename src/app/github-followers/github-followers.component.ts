import { Component, OnInit } from '@angular/core';
import { GithubFollowersServiceService } from '../github-followers-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css'],
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];

  constructor(
    private service: GithubFollowersServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.service
      .getAll()
      .subscribe((followers: any[]) => (this.followers = followers));
  }
}
