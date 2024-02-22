<template>
  <div class="header">
    <DoneAll class="header_icon" fontsize="large" />
    <span class="header-title">Task Checker</span>
    <button v-if="isLoggedIn" class="logout-button" @click="handleSignOut">
      <span>Logout</span>
    </button>
  </div>
</template>

<script>
import DoneAll from 'vue-material-design-icons/CheckAll.vue'
import { auth, signOut } from '../firebase';
import { useRouter } from 'vue-router'; // useRouterをインポート

export default {
  name: 'HeaderComp',
  components:{
    DoneAll
  },
  props: [ 'isLoggedIn'],
  setup(){
    // setup関数でuseRouterを使用 
    const router = useRouter();

    // methods:の代わりに呼び出したい関数を設定
    const handleSignOut = async () => {
      try {
        await signOut(auth); // Firebaseからサインアウト
        router.push('/'); // ログアウト後のリダイレクト
      } catch (error) {
        console.error('ログアウトエラー:', error);
      }
    };
    // 他のコンポーネントからもhandleSignOutを利用できるようにする
    return { handleSignOut };
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  }

  .header_icon {
    color: rgb(170, 1, 1);
  }

  .header_title {
    font-size: 25px;
    color: rgb(70, 70, 70);
    font-weight: bold;
    margin-left: 10px;
  }

  /* firebase導入後に追記 */
  .logout-button {
    display: flex;
    align-items: center;
  }

</style>