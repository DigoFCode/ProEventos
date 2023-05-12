import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent {
  public eventos: any = [];
  widthImg: number = 150;
  marginImg: number = 2;
  mostrarImagem = false;
  private _filtroLista: string = '';
  eventosFiltrados: any = [];

  public get filtroLista() {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtraEventos(this.filtroLista)
      : this.eventos;
  }

  filtraEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string }) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEventos();
  }
  alterarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos(): void {
    this.http.get('https://localhost:7056/api/eventos').subscribe(
      (response) => {
        (this.eventos = response), (this.eventosFiltrados = this.eventos);
      },
      (error) => console.log(error),
      () => console.log('Requisição completa')
    );
  }
}
