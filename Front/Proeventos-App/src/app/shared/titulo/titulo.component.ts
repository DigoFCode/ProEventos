import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.scss',
})
export class TituloComponent implements OnInit {
  @Input() title = '';
  @Input() subtitle = 'Desde 2021';
  @Input() iconClass = 'fa fa-user';
  @Input() buttonList = false;

  constructor(private router: Router) {}

  ngOnInit(): void { }

  listar(): void{
    this.router.navigate([`/${this.title.toLowerCase()}/lista`]);
  }
}
