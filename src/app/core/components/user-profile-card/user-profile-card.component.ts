import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../assets/ACT_01/users';

@Component({
  selector: 'app-user-profile-card',
  imports: [CommonModule],
  templateUrl: './user-profile-card.component.html',
  styleUrl: './user-profile-card.component.scss'
})
export class UserProfileCardComponent {
  @Input() user: User = {} as User;
}
