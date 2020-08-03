import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';

export class User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage{

  email: string;
  password: string;
  public user: User = new User();

  constructor(public fAuth: AngularFireAuth,
              private router: Router,
              private storage: Storage,
              private platform: Platform) { }

  ionViewWillEnter() {
    this.platform.ready().then(data => {
      this.storage.get('username').then((val) => {
        console.log(val);
        this.user.email = val;
      });
      this.storage.get('password').then((val) => {
        console.log(val);
        this.user.password = val;
      });
      if (this.user.email !== null && this.user.password !== null) {
        this.login();
      }
    });
  }
  
  async login() {
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log('Successfully logged in ');
        // this.nativeStorage.setItem('credential', {userName: 'this.user.email', password: 'this.user.password'});
        this.storage.set('username', this.user.email);
        this.storage.set('password', this.user.password);
        this.router.navigate(['/tabs']);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
