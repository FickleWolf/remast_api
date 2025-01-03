import * as admin from "firebase-admin";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;

  constructor() {
    const firebaseConfig = JSON.parse(process.env.FIREBASE_CREDENTIALS);

    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return await this.firebaseApp.auth().verifyIdToken(token);
  }

  getFirestore(): admin.firestore.Firestore {
    return this.firebaseApp.firestore();
  }
}
