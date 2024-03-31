import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.scss',
})
export class TituloComponent implements OnInit {
  @Input() title = '';

  constructor() {}

  ngOnInit(): void {}
}
