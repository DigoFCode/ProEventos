import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  //providers: [EventoService],
})
export class EventosComponent {
  modalRef = {} as BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  public widthImg: number = 150;
  public marginImg: number = 2;
  public exibirImagem = false;

  private _filtroLista: string = '';

  public get filtroLista() {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
      ? this.filtraEventos(this.filtroLista)
      : this.eventos;
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  /**
   * Initializes the component and calls the `getEventos` method.
   *
   * @return {void} This function does not return anything.
   */
  public ngOnInit(): void {
    this.getEventos();
    this.spinner.show();
  }

  /**
   * A function that filters events based on a specified criteria.
   *
   * @param {string} filtrarPor - the criteria to filter events by
   * @return {Evento[]} an array of events that match the specified criteria
   */
  public filtraEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      ({ tema, local }: { tema: string; local: string }) =>
        tema.toLocaleLowerCase().includes(filtrarPor) ||
        local.toLocaleLowerCase().includes(filtrarPor)
    );
  }

  /**
   * Retrieves the list of events from the event service and updates the component's state with the retrieved data.
   *
   * @return {void} This function does not return a value.
   */
  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        console.error(error);
        this.spinner.hide();
        this.toastr.error('Erro ao carregar eventos!', 'Erro!');
      },
      complete: () => this.spinner.hide(),
    });
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  public confirm(): void {
    this.modalRef.hide();
    this.toastr.success('Evento excluído com sucesso!', 'Excluído!');
  }
  public decline(): void {
    this.modalRef.hide();
  }
}
