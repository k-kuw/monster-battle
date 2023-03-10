<!-- ユーザー情報コンポーネント -->
<template>
  <h1>ステータス</h1>
  <!-- ログイン中(DBから情報取得済み)の場合のみ、ステータスを表示 -->
  <div v-if="status" class="info">
    <ul class="status">
      <li>なまえ：{{ status.name }}</li>
      <li>レベル：{{ status.level }}</li>
      <li>たいりょく：{{ status.hp }}</li>
      <li>こうげきりょく：{{ status.atk }}</li>
    </ul>
  </div>
  <div v-else-if="!status && fetchUserError">{{ fetchUserError }}</div>
  <div v-else>
    <p>ログインしてください</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface User {
  id: number;
  level: number;
  ex: number;
  hp: number;
  atk: number;
  name: string;
  imageUrl: string;
}

export default defineComponent({
  data(): { status: null | User, fetchUserError: string } {
    return {
      status: null,
      fetchUserError: ''
    }
  },
  // ログイン状況の確認
  created() {
    const login = this.$store.getters.getLogin
    if (!login.isLoggedIn) {
      return
    }
    // ログイン中の場合のみ、バックエンドからステータスを取得
    this.axios.get(`/api/user/${login.id}`).then(res => {
      this.status = res.data
    }).catch(err=> {
      if (err.response.status === 500) {
        this.fetchUserError = "サーバーとの接続に失敗しました"
        return;
      }
      this.fetchUserError = err.response.data
    })
  }
})
</script>

<style>
.info {
  margin: 3rem 20%;
  padding:5rem;
  border-radius: 2rem;
  background-color: #c3f7df;
}
.status {
  list-style: none;
}

.status li {
  font-size: 25px;
  font-weight: bold;
  border-bottom: black solid 1px;
  margin: 2rem;
}
</style>
