<template>
    <HeaderComp :isLoggedIn="userStore.isLoggedIn"/>
    <div class="form-body">
      <input type="email" v-model="email" placeholder="メールアドレス">
      <input type="password" v-model="password" placeholder="パスワード">
      <div class="button-list">
        <button class="button" @click="handleSignUp">新規登録</button>
        <button class="button" @click="handleSignIn">ログイン</button>
      </div>
    </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '../firebase';
import { useRouter } from 'vue-router'; 
import  HeaderComp  from '../components/Header.vue';
import { useUserStore } from '../stores/userStore';

export default {
  components: {
    HeaderComp
  },
  setup() {
    // const user = ref(null);
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    // const isLoggedIn = ref(false);
    const userStore = useUserStore();

    onMounted(() => {
      // OnAuthStateChangedを使用して、認証状態に変更があったとき(サインインする、サインアウトする)に、コールバック関数を実施。
      // store内で認証されたユーザー(authUser)をuser変数に代入する。
      auth.onAuthStateChanged((authUser) => {
        const userStore = useUserStore();
        userStore.checkAuth(authUser);
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


    return { email, password, userStore, handleSignUp, handleSignIn, handleSignOut };
  }
};
</script>

<style scoped>
  .form-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
    padding: 2vw 10vw;
    text-align: center;
  }

  input {
    margin-bottom: 16px;
  }

  .button-list {
    display: flex;
    flex-direction: column;
  }

  .button {
    background-color: rgb(66, 163, 247);
    color: white;
    border-radius: 25px;
    border-style: none;
    padding: 8px 20px;
    margin-bottom: 8px;
    font-size: 15px;
    width: 246px;
  }

</style>