import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {
  signInWithEmailAndPassword,
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  onAuthStateChanged
} from '@angular/fire/auth';
import { ref, uploadBytesResumable, getDownloadURL, Storage, } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, from, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';
import { switchMap, catchError, timeout } from 'rxjs/operators';
import { doc, Firestore, setDoc,query } from '@angular/fire/firestore';
import { EqualityPassword } from '../lib/custom-validators-function';
import { UserModel } from '../Models/other-person';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  selectedFile!: File;

  constructor(
    public _fb: FormBuilder,
    public _db: Firestore,
    private _auth: Auth,
    private _storage: Storage,
    private snackBar: MatSnackBar,
    private _router: Router,
    private _shared: SharedService,

  ) {


const auth = getAuth() ;
onAuthStateChanged(auth,(user)=>{
  if(user){
    this._shared.currentUser = user as UserModel;
    this._shared.getUserChats();
  }
  else{
    localStorage.clear();
  this._router.navigate(['','login']);
  }
})

  }
  initLoginForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  initRegisterForm() {


    this.registerForm = this._fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
    this.registerForm.get('confirmPassword')!.addValidators(EqualityPassword(
      this.registerForm.get('password') as AbstractControl<any, any | null>));
    this.registerForm.get('password')!.addValidators(EqualityPassword(
      this.registerForm.get('password') as AbstractControl<any, any | null>));

  }

  emailLogin() {

    from(signInWithEmailAndPassword(
      this._auth,
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value
    )
    ).pipe(
      switchMap((value: any, index: any) => {
        if (value.user) {

          return of(value);
        }
        else {
          return EMPTY;
        }
      }),
      catchError((err) => throwError(() => {
        if (err instanceof FirebaseError) {
          this.snackBar.open(err.code, '', { duration: 1500 })
        }
        return err;
      })),

    ).subscribe({
      next: (credential: any) => {


        const currentUser:UserModel = {
          uid:credential.user.uid,
          displayName:credential.user.displayName,
          photoURL:credential.user.photoURL,
          email:credential.user.email,
        }
        this._shared.currentUser = currentUser;
        localStorage.setItem('refreshToken', credential.user.stsTokenManager.refreshToken);
        localStorage.setItem('accessToken', credential.user.stsTokenManager.accessToken);
        localStorage.setItem('expirationTime', credential.user.stsTokenManager.expirationTime);
        this.snackBar.open("Sign In Successful!", "", { duration: 1500 });

          this._router.navigate([""])

      },
      error(err) {

      },
    });
  }
  emailSignUp() {
    const displayName = this.registerForm.value.username;
    const email = this.registerForm.get('email')?.value;
    from(createUserWithEmailAndPassword(
      this._auth,
      this.registerForm.get('email')?.value,
      this.registerForm.get('password')?.value,

    )).subscribe((credential: any) => {
      localStorage.setItem('refreshToken', credential.user.stsTokenManager.refreshToken);
      localStorage.setItem('accessToken', credential.user.stsTokenManager.accessToken);
      localStorage.setItem('expirationTime', credential.user.stsTokenManager.expirationTime);
      this.snackBar.open("Sign Up Successful!");
      const storageRef = ref(this._storage, this.registerForm.value.username);
      uploadBytesResumable(storageRef, this.selectedFile).then(
        () => getDownloadURL(storageRef).then(async (downloadURL: string) => {
          try {
            await updateProfile(credential.user,
              {
                displayName: this.registerForm.value.username,
                photoURL: downloadURL,
              });
            await setDoc(doc(this._db, "users", credential.user.uid), {
              uid: credential.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(this._db, "userChats", credential.user.uid), {});

              this._router.navigate([""])

          } catch (error) {

          }
        })
      )

    })


  }
  logOut(){
    localStorage.clear();
    this._router.navigate(['','login'])
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
  }
}


