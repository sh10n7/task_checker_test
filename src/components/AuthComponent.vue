<template>
  <div>
    <h1>サインイン & サインアップ</h1>
    <div v-if="user">
      <p>ログインユーザー: {{ user.email }}</p>
      <button @click="handleSignOut">ログアウト</button>
    </div>
    <div v-else>
      <p>ログインしていません</p>
      <input type="email" v-model="email" placeholder="メールアドレス">
      <input type="password" v-model="password" placeholder="パスワード">
      <button @click="handleSignUp">サインアップ</button>
      <button @click="handleSignIn">サインイン</button>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '../firebase';
import { useRouter } from 'vue-router'; 

export default {
  setup() {
    const user = ref(null);
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    onMounted(() => {
      auth.onAuthStateChanged((authUser) => {
        user.value = authUser;
      });
    });


    const handleSignUp = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
      } catch (error) {
        alert(error.message);
      }
    };


    const handleSignIn = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/home'); // ログイン後に/homeにリダイレクト
      } catch (error) {
        alert(error.message);
      }
    };


    const handleSignOut = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('ログアウトエラー:', error);
      }
    };


    return { user, email, password, handleSignUp, handleSignIn, handleSignOut };
  }
};
</script>
