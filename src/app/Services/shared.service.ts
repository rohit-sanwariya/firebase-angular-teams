import { Injectable } from '@angular/core';
import { UserModel } from '../Models/other-person';
import { v4 as uuid } from 'uuid';
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { from, Observable, Subject } from 'rxjs';
import {
  getDownloadURL,
  getStorage,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { MessageItemModel, MessageResponseItemModel } from '../Pages/home/chat/messages/message-item/message-item-model';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  currentChat: Array<any> = [];
  user!: UserModel;
  messageText: string = '';
  messageImg!: File | null;
  currentUser!: UserModel;
  userChats$: Subject<any> = new Subject();
  chatsLoading: boolean = true;
  chatArray:Array<MessageItemModel> = [];
  scrollToBottom: Subject<boolean> = new Subject();

  getCurrentChat() {}

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

  constructor(
    private _db: Firestore,
    private _storage: Storage,
    ) {}

  async getUserChats() {
    if (this.currentUser) {
      const ref = doc(this._db, 'userChats', this.currentUser?.uid);
      from(getDoc(ref)).subscribe({
        next: (userchats) => {
          let data = Object.values(userchats.data()!);
        // //  console.log(data.sort((a,b)=>a.date.nanoseconds-b.date.nanoseconds));
        //   console.log(data[0].date.nanoseconds,data[1].date.nanoseconds);
        //   console.log(data[0].date.nanoseconds>data[1].date.nanoseconds);
        //   console.log(data[0],data[1]);
        // data =  data.sort((a,b)=>b.date.nanoseconds-a.date.nanoseconds)
        if(userchats.data())
     {
          console.log(data.length);
          this.userChats$.next(data);
          this.setUserExist(data[0].userInfo)

        }

          // this.setUserExist(data[0].userInfo);
          this.chatsLoading = false;

        },
        error(err) {
          console.log(err);
        },
      });
    }
  }

  setUserExist(user: any) {
    this.user = user;
    this.getChats();
    this.createMessage();


  }


  async getChats(){
    const ref = doc(this._db, 'chats', this.chatId);
    const chats = await getDoc(ref);

    if(chats.data()){

       this.chatArray =  (chats.data()!['messages'] as Array<MessageResponseItemModel>).map(
        (item)=>{

            const self:boolean = item.senderId === this.currentUser.uid;
            const date:Date = new Date(item.date.seconds*1000);
            const newItem:MessageItemModel={
                self,
                date,
                text:item.text,
                senderId:item.senderId,
                id:item.id
            }
            return newItem

        }
      );
      this.scrollToBottom.next(true);
    }
  }

  createMessage(){
    onSnapshot(doc(this._db, "chats",this.chatId),(chats:any)=>{
      this.chatArray =  (chats.data()!['messages'] as Array<MessageResponseItemModel>).map(
        (item)=>{

            const self:boolean = item.senderId === this.currentUser.uid;
            const date:Date = new Date(item.date.seconds*1000);
            const newItem:MessageItemModel={
                self,
                date,
                text:item.text,
                senderId:item.senderId,
                id:item.id
            }
            return newItem

        }
      );

    })
  }
  async sendMessage() {
    console.log(this.messageImg);
    console.log(this.messageText);
    this.scrollToBottom.next(true);

    const text = this.messageText;
    this.messageText = "";
    if (this.messageImg) {
      // const imgRef = ref(this._db,)
      const storageRef = ref(getStorage(), uuid());
      const uploadTask = uploadBytesResumable(storageRef, this.messageImg);
      uploadTask.on(
        'state_changed',
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL: any) => {
         this.scrollToBottom.next(true);

            await updateDoc(doc(this._db, "chats", this.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text:text,
                senderId: this.currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else if (!!text) {
      console.log(text);

      await updateDoc(doc(this._db, "chats", this.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text:text,
          senderId: this.currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(this._db, "userChats", this.currentUser.uid), {
        [this.chatId + ".lastMessage"]: {
          text,
        },
        [this.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(this._db, "userChats", this.user.uid), {
        [this.chatId + ".lastMessage"]: {
          text,
        },
        [this.chatId + ".date"]: serverTimestamp(),
      });

    }
    this.messageImg = null;
    this.getChats()
  }

  get chatId(){
    return this.currentUser.uid>this.user.uid? this.currentUser.uid+this.user.uid: this.user.uid+this.currentUser.uid;
  }
  onFileSelected(event: Event) {
    if (event && event.target) {
      const fileElement = event.target as HTMLInputElement;
      this.messageImg = fileElement.files?.length ? fileElement.files[0] : null;
      console.log(this.messageImg);
    }
  }
}
