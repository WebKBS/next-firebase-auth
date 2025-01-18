# NEXT JS와 FIREBASE를 이용한 서버사이드(SSR) Authentication 구현

## 개요
NEXT JS와 FIREBASE를 이용하여 서버사이드(SSR) 환경에서 server action을 사용한 회원가입, 로그인, 로그아웃을 구현하는 예제입니다.

## Version
- Next.js: 15.1.4
- Firebase: 11.2.0

## firebase 설치

```bash
npm install firebase
```

## firebase 설정

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
```

나머지는 다음 블로그를 참고하세요.

[Next.js와 Firebase를 이용한 서버사이드(SSR) Authentication 구현](https://recodelog.com/blog/firebase/nextjs-authentication)
```