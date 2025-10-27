import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-e404',
  imports: [],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.scss',
})
export class Error404Component implements OnInit {

  ngOnInit() {
    console.log('404 error page');
  }

}
