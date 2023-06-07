import { Component, ElementRef, ViewChild } from '@angular/core';
import {io} from 'socket.io-client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private socket: any;
  @ViewChild("ganadosX") ganadosX!: ElementRef;
  @ViewChild("ganadosO") ganadosO!: ElementRef;
  @ViewChild("empates") empates!: ElementRef;
  
  @ViewChild("jugadorActual") jugadorActual!: ElementRef;
  @ViewChild("jugadorX") jugadorX!: ElementRef;
  @ViewChild("jugadorO") jugadorO!: ElementRef;

  @ViewChild("id00") id00!: ElementRef;
  @ViewChild("id01") id01!: ElementRef;
  @ViewChild("id02") id02!: ElementRef;
  @ViewChild("id10") id10!: ElementRef;
  @ViewChild("id11") id11!: ElementRef;
  @ViewChild("id12") id12!: ElementRef;
  @ViewChild("id20") id20!: ElementRef;
  @ViewChild("id21") id21!: ElementRef;
  @ViewChild("id22") id22!: ElementRef;
  constructor() {
    // Crea una instancia de Socket.IO y se conecta al servidor
    this.socket = io('http://localhost:3004'); // Reemplaza la URL con la del servidor de Socket.IO

    let nombreUsuario  = 'X';
    this.socket.on('connect', () => {
        this.socket.emit('nuevoUsuario', nombreUsuario);
    });

    this.socket.on('Jugador', (valor:any) => {
      console.log(valor);
      this.jugadorActual.nativeElement.innerHTML = valor;
      // document.querySelector('#jugadorActual').innerHTML = valor;
      if(valor === 'X'){
        // document.getElementById('jugadorX').classList.remove("d-none");
        this.jugadorX.nativeElement.classList.remove('d-none');
        // document.getElementById('jugadorO').classList.add("d-none");
        this.jugadorO.nativeElement.classList.add('d-none');
      }else{
        // document.getElementById('jugadorO').classList.remove("d-none");
        this.jugadorO.nativeElement.classList.remove('d-none');
        // document.getElementById('jugadorX').classList.add("d-none");
        this.jugadorX.nativeElement.classList.add('d-none');
      }
    });


    this.socket.on('jugadas', (game: any)=>{
      console.log(game);
      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              let elemento = game[i][j];
              console.log(elemento);
              if(elemento != '-'){
                  // document.getElementById(i+'_'+j).innerHTML = elemento;
                  // document.getElementById(i+'_'+j).disabled = true;
                if(i === 0 && j === 0){
                  this.id00.nativeElement.innerHTML = elemento;
                  this.id00.nativeElement.disabled = true;
                }
                if(i === 0 && j === 1){
                  this.id01.nativeElement.innerHTML = elemento;
                  this.id01.nativeElement.disabled = true;
                }
                if(i === 0 && j === 2){
                  this.id02.nativeElement.innerHTML = elemento;
                  this.id02.nativeElement.disabled = true;
                }
                if(i === 1 && j === 0){
                  this.id10.nativeElement.innerHTML = elemento;
                  this.id10.nativeElement.disabled = true;
                }
                if(i === 1 && j === 1){
                  this.id11.nativeElement.innerHTML = elemento;
                  this.id11.nativeElement.disabled = true;
                }
                if(i === 1 && j === 2){
                  this.id12.nativeElement.innerHTML = elemento;
                  this.id12.nativeElement.disabled = true;
                }
                if(i === 2 && j === 0){
                  this.id20.nativeElement.innerHTML = elemento;
                  this.id20.nativeElement.disabled = true;
                }
                if(i === 2 && j === 1){
                  this.id21.nativeElement.innerHTML = elemento;
                  this.id21.nativeElement.disabled = true;
                }
                if(i === 2 && j === 2){
                  this.id22.nativeElement.innerHTML = elemento;
                  this.id22.nativeElement.disabled = true;
                }
              }
          }
          
      }
    });

    this.socket.on('score', (value: any)=>{
      this.ganadosX.nativeElement.innerHTML = value.ganadosX;
      this.ganadosO.nativeElement.innerHTML = value.ganadosO;
      this.empates.nativeElement.innerHTML = value.empates;

    });

    this.socket.on('jugada', (value: any)=>{
      // console.log('Jugadas recibidas '+value);
      let jugada = value.split('_');
      console.log(jugada);
      if(jugada.length > 1 ){
          // document.getElementById(jugada[0]+'_'+jugada[1]).innerHTML = jugada[2];
          // document.getElementById(jugada[0]+'_'+jugada[1]).disabled = true;
          if(jugada[0] == 0 && jugada[1] == 0){
            this.id00.nativeElement.innerHTML = jugada[2];
            this.id00.nativeElement.disabled = true;
          }
          if(jugada[0] == 0 && jugada[1] == 1){
            this.id01.nativeElement.innerHTML = jugada[2];
            this.id01.nativeElement.disabled = true;
          }
          if(jugada[0] == 0 && jugada[1] == 2){
            this.id02.nativeElement.innerHTML = jugada[2];
            this.id02.nativeElement.disabled = true;
          }
          if(jugada[0] == 1 && jugada[1] == 0){
            this.id10.nativeElement.innerHTML = jugada[2];
            this.id10.nativeElement.disabled = true;
          }
          if(jugada[0] == 1 && jugada[1] == 1){
            this.id11.nativeElement.innerHTML = jugada[2];
            this.id11.nativeElement.disabled = true;
          }
          if(jugada[0] == 1 && jugada[1] == 2){
            this.id12.nativeElement.innerHTML = jugada[2];
            this.id12.nativeElement.disabled = true;
          }
          if(jugada[0] == 2 && jugada[1] == 0){
            this.id20.nativeElement.innerHTML = jugada[2];
            this.id20.nativeElement.disabled = true;
          }
          if(jugada[0] == 2 && jugada[1] == 1){
            this.id21.nativeElement.innerHTML = jugada[2];
            this.id21.nativeElement.disabled = true;
          }
          if(jugada[0] == 2 && jugada[1] == 2){
            this.id22.nativeElement.innerHTML = jugada[2];
            this.id22.nativeElement.disabled = true;
          }

          if(jugada[2] != 'X'){
              // document.getElementById('jugadorX').classList.remove("d-none");
              this.jugadorX.nativeElement.classList.remove('d-none');
              // document.getElementById('jugadorO').classList.add("d-none");
              this.jugadorO.nativeElement.classList.add('d-none');
          }else{
              // document.getElementById('jugadorO').classList.remove("d-none");
              // document.getElementById('jugadorX').classList.add("d-none");

              // document.getElementById('jugadorO').classList.remove("d-none");
              this.jugadorO.nativeElement.classList.remove('d-none');
              // document.getElementById('jugadorX').classList.add("d-none");
              this.jugadorX.nativeElement.classList.add('d-none');
          }

          if(jugada[3] == 'ganado'){
            Swal.fire('GANADOR!!!',`El jugador ${jugada[2]} ha ganado la partida`, 'success'); 
            // alert('Ganado');
          }
          if(jugada[3] == 'empate'){
              Swal.fire('Empate!!!',`Ha habido un empate de los jugadores`, 'warning');
            // alert('Empate');
          }
      }else{
          alert(value);
          // Swal.fire(value);
      }
    });


    // Escucha un evento del servidor
    // this.socket.on('', (data: any) => {
    //   console.log('Mensaje recibido:', data);
    // });

    // // Envía un evento al servidor
    // this.socket.emit('enviarMensaje', 'Hola, servidor!');
    this.socket.on('respuestaReinicio', (valor: any)=>{
      // console.log(game);
      this.id00.nativeElement.innerHTML = '';
      this.id00.nativeElement.disabled = false;

      this.id01.nativeElement.innerHTML = '';
      this.id01.nativeElement.disabled = false;

      this.id02.nativeElement.innerHTML = '';
      this.id02.nativeElement.disabled = false;

      this.id10.nativeElement.innerHTML = '';
      this.id10.nativeElement.disabled = false;

      this.id11.nativeElement.innerHTML = '';
      this.id11.nativeElement.disabled = false;

      this.id12.nativeElement.innerHTML = '';
      this.id12.nativeElement.disabled = false;

      this.id20.nativeElement.innerHTML = '';
      this.id20.nativeElement.disabled = false;

      this.id21.nativeElement.innerHTML = '';
      this.id21.nativeElement.disabled = false;

      this.id22.nativeElement.innerHTML = '';
      this.id22.nativeElement.disabled = false;

    });
  }

  enviarID(event: any) {
    let Id = event.target.id;
    console.log(Id);
    // console.log(this.jugadorActual.nativeElement.innerHTML);
    this.socket.emit('coordenadas',Id+'_'+this.jugadorActual.nativeElement.innerHTML);
    // console.log('Button Id:', buttonId);
  }

  reiniciarJuego(){
    this.socket.emit('reiniciar', this.jugadorActual.nativeElement.innerHTML);
  }
}
