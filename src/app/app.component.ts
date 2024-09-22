import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from './models/player.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayerFormComponent, PlayerListComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedPlayer: Player | null = null;

  @ViewChild(PlayerListComponent) playerListComponent!: PlayerListComponent;

  
  addPlayerToList(player: Player) {
    this.playerListComponent.addLocalPlayer(player); 
  }
}
