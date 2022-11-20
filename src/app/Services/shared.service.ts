import { Injectable } from '@angular/core';
import { UserModel } from '../Models/other-person';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { from, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  user!: UserModel;
  currentUser!: UserModel;
  userChats$: Subject<any> = new Subject();
  chatsLoading: boolean = true;
  async setuser(value: any) {
    this.user = value;
    const combinedId =
      this.currentUser.uid > this.user.uid
        ? this.currentUser.uid + this.user.uid
        : this.user.uid + this.currentUser.uid;
    const ref: DocumentReference = doc(this._db, 'chats', combinedId);
    const q = query(
      collection(this._db, 'users'),
      where('uid', '==', this.currentUser.uid)
    );
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    querySnapshot.forEach((res) => {});

    try {
      const res: DocumentSnapshot<DocumentData> = await getDoc(ref);

      if (!res.exists()) {
        await setDoc(doc(this._db, 'chats', combinedId), { messages: [] });
        await updateDoc(doc(this._db, 'userChats', this.currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: this.user.uid,
            displayName: this.user.displayName,
            photoURL: this.user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(this._db, 'userChats', this.user.uid), {
          [combinedId + '.userInfo']: {
            uid: this.currentUser.uid,
            displayName: this.currentUser.displayName,
            photoURL: this.currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {}
  }

  constructor(private _db: Firestore) {}


  async getUserChats() {
    if (this.currentUser) {
      const ref = doc(this._db, 'userChats', this.currentUser?.uid);
      from(getDoc(ref)).subscribe((val) => {
        this.userChats$.next(Object.values(val.data()!));
        this.chatsLoading = false;
      });
    }
  }

  setUser(user:any){
    this.user = user;
  }
}
