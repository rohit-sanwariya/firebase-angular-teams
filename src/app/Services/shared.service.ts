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
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  user!: UserModel;
  currentUser!: UserModel;
  async setuser(value: any) {
    this.user = value;
    const combinedId =
      this.currentUser.uid > this.user.uid
        ? this.currentUser.uid + this.user.uid
        : this.user.uid + this.currentUser.uid;
    const ref:DocumentReference= doc(this._db, 'chats', combinedId);
    const q = query(collection(this._db,"users"),where("uid","==",this.currentUser.uid));
    const querySnapshot:QuerySnapshot<DocumentData> = await getDocs(q);
    console.log({len:querySnapshot.docs.length});

    querySnapshot.forEach((res)=>{
      console.log(res.data());

    })

    try {
      const res:DocumentSnapshot<DocumentData> = await getDoc(ref);

      console.log('leng',);
    if (!res.exists()) {
      console.log(res);
      await setDoc(doc(this._db, 'chats', combinedId), { messages: [] });
      const currentRef =  doc(this._db, 'userChats', this.currentUser.uid);
      const userRef    =  doc(this._db, 'userChats', this.user.uid);
      await updateDoc(doc(this._db, "userChats", this.currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: this.user.uid,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(this._db, "userChats", this.user.uid), {
        [combinedId + ".userInfo"]: {
          uid: this.currentUser.uid,
          displayName: this.currentUser.displayName,
          photoURL: this.currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
    else{
      console.log('has chats');

    }
    } catch (error) {
      console.log(error);

    }
  }

  constructor(private _db: Firestore) {}
}
