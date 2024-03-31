import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { finalize, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent {
  [x: string]: any;
  public eventos: any = [];
  widthImg: number = 150;
  marginImg: number = 2;
  exibirImagem = false;
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
  constructor(private http: HttpClient) {}

  /**
   * Initializes the component and calls the 'getEventos' method to retrieve the eventos.
   *
   * This method is called when the component is initialized. It calls the 'getEventos'
   * method to retrieve the eventos and populate the component's data.
   *
   * @return {void} This method does not return a value.
   */
  ngOnInit(): void {
    this.getEventos();
  }

  /**
   * A function that filters events based on a specified criteria.
   *
   * @param filtrarPor The criteria to filter events by
   * @returns The filtered list of events
   */
  filtraEventos(filtrarPor: string): Event[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      ({ tema, local }: { tema: string; local: string }) =>
        tema.toLocaleLowerCase().includes(filtrarPor) ||
        local.toLocaleLowerCase().includes(filtrarPor)
    );
  }

  /**
   * Retrieves the list of events from the API.
   *
   * @return {void} This function does not return a value.
   */
  getEventos(): void {
    this.http
      .get('https://localhost:7056/api/eventos')
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.message));
        })
      )
      .subscribe((response) => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos;
      });
  }
}
