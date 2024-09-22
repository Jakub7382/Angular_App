import { Firestore, collection, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { Observable } from 'rxjs';
import { collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.playersCollection = collection(this.firestore, 'players'); // Typizacja kolekcji
  }

  
  getPlayers(): Observable<Player[]> {
    return collectionData(this.playersCollection, { idField: 'id' }) as Observable<Player[]>;
  }

 
  addPlayer(player: Player): Promise<void> {
    const { id, ...playerData } = player;  
    return addDoc(this.playersCollection, playerData)
      .then(() => {
        console.log('Player added to Firestore');
      })
      .catch((error) => {
        console.error('Error adding player: ', error);
      });
  }
  

  
  updatePlayer(player: Player): Promise<void> {
    const playerDoc = doc(this.firestore, `players/${player.id}`);
    return updateDoc(playerDoc, { ...player });
  }

  
  deletePlayer(id: string): Promise<void> {
    const playerDoc = doc(this.firestore, `players/${id}`);
    return deleteDoc(playerDoc);
  }
}
