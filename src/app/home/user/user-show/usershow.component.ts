import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-usershow',
  templateUrl: './usershow.component.html',
  styleUrls: ['./usershow.component.scss']
})
export class UsershowComponent {
  uuid!: any;
  role!: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }
  ngOnInit() {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.userService.getRole(this.uuid).subscribe((data) => {
      this.role = data
      console.log(this.role)
    });
  }
}
