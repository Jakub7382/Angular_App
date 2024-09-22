import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from '../../models/player.model';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  @Input() player: Player | null = null;
  @Output() playerAdded = new EventEmitter<Player>();  
  isEditing: boolean = false;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    if (!this.player) {
      this.resetForm();  
    }
  }

  addOrUpdatePlayer(): void {
    if (this.isEditing && this.player && this.player.id) {
      this.playerService.updatePlayer(this.player).then(() => {
        console.log('Player updated');
        this.resetForm();
      });
    } else {
      if (this.player) {
        this.playerService.addPlayer(this.player).then(() => {
          console.log('Player added');
          this.playerAdded.emit(this.player!);  
          this.resetForm();
        });
      }
    }
  }
  

  resetForm(): void {
    this.player = { name: '', position: '', id: undefined };
    this.isEditing = false;
  }
}
