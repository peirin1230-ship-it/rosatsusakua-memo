# Firebase セットアップ手順

ログイン機能（Googleアカウント）とクラウド同期を有効にするための手順です。

## 1. Firebase プロジェクトを作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: `rosatsusakua-memo`）
4. Google Analytics はオフでOK
5. 「プロジェクトを作成」

## 2. Web アプリを登録

1. プロジェクトのトップページで「</>」（Web）アイコンをクリック
2. アプリのニックネームを入力（例: `rosatsusakua-memo`）
3. 「Firebase Hosting も設定する」はチェック不要
4. 「アプリを登録」
5. 表示される `firebaseConfig` の値を **メモしておく**

## 3. Google ログインを有効化

1. 左メニュー「Authentication」→「始める」
2. 「Sign-in method」タブ → 「Google」をクリック
3. 「有効にする」をオン
4. サポートメール（自分のメール）を選択
5. 「保存」

## 4. Firestore データベースを作成

1. 左メニュー「Firestore Database」→「データベースを作成」
2. 「本番環境モードで開始」を選択
3. ロケーション: `asia-northeast1`（東京）推奨
4. 「作成」

### セキュリティルールを設定

Firestore の「ルール」タブで以下に置き換え：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

「公開」をクリック。

## 5. index.html に設定を反映

`index.html` 内の以下の部分を、手順2でメモした値に置き換えます：

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // ← 置き換え
  authDomain: "YOUR_PROJECT.firebaseapp.com",  // ← 置き換え
  projectId: "YOUR_PROJECT_ID",        // ← 置き換え
  storageBucket: "YOUR_PROJECT.firebasestorage.app", // ← 置き換え
  messagingSenderId: "YOUR_SENDER_ID", // ← 置き換え
  appId: "YOUR_APP_ID"                 // ← 置き換え
};
```

## 6. GitHub Pages のドメインを許可

1. Firebase Console → Authentication → 設定 → 「承認済みドメイン」
2. 「ドメインを追加」で以下を追加：
   - `peirin1230-ship-it.github.io`

## 7. デプロイ

変更をコミットして push すれば、GitHub Pages で自動的に反映されます。

```bash
git add -A
git commit -m "Add Firebase auth and cloud sync"
git push
```

## 動作確認

1. GitHub Pages の URL にアクセス
2. 右上の「ログイン」ボタンをクリック
3. Google アカウントでログイン
4. メモを編集 → 「同期済」バッジが表示されれば成功
5. 別の端末からログインして同じデータが表示されるか確認

## 注意事項

- Firebase の設定値（apiKey 等）はクライアントサイドで使うもので、公開しても問題ありません。セキュリティは Firestore のルールで担保されます。
- ログインしない場合はこれまで通り localStorage のみで動作します（既存の動作に影響なし）。
- 初回ログイン時、localStorage にあるデータが自動的に Firestore にアップロードされます。
