import { Component } from '@angular/core';
import { StorageData } from '../../helpers/storage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-acount',
  imports: [CommonModule],
  templateUrl: './my-acount.html',
  styleUrl: './my-acount.scss',
})
export class MyAcount {
  public user = StorageData.get('user')
}
