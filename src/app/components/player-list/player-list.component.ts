import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {
  players$: Observable<Player[]>;
  localPlayers: Player[] = []
  @Output() editPlayer = new EventEmitter<Player>();  

  constructor(private playerService: PlayerService) {
    this.players$ = this.playerService.getPlayers();
  }

  loadPlayers(): void {
    this.players$ = this.playerService.getPlayers();
    this.players$.subscribe(players => {
      this.localPlayers = players;  // Przypisanie lokalnej listy graczy
    });
  }

  // Metoda do lokalnego dodania gracza (bez odświeżania całej listy z Firestore)
  addLocalPlayer(player: Player): void {
    this.localPlayers.push(player);  // Dodanie gracza do lokalnej listy
  }

  deletePlayer(id: string): void {
    this.playerService.deletePlayer(id).then(() => {
      console.log('Player deleted');
      this.localPlayers = this.localPlayers.filter((player: Player) => player.id !== id);
    });
  }
}
