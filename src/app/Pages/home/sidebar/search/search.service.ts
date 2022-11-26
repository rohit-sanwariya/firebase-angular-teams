import { Injectable } from '@angular/core';
import {
  doc,
  Firestore,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SharedService } from 'src/app/Services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  setOtherUser() {
    this._shared.setuser(this.searchUserControl.value);
    this.searchUserControl.reset();
  }
  searchUserControl: FormControl = new FormControl('', []);
  options!: any;
  constructor(
    public _db: Firestore,
    private _storage: Storage,
    private _shared: SharedService
  ) {
    this.searchUserControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((username: string) => {
        if (username) {
          this.seachUser(username);
        }
      });
  }

  async seachUser(username: string) {
    const searchQuery = query(
      collection(this._db, 'users'),
      where('displayName', '==', username)
    );
    const querySnapshot = await getDocs(searchQuery);
    querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      if (Array.isArray(doc.data())) {
        this.options = doc.data();
      } else {
        this.options = [doc.data()];
      }
    });
  }

  
}
