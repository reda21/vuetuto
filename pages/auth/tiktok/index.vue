<template>
  <div class="tiktok-auth text-white">
    <h1>Connexion avec TikTok</h1>
    <button @click="connect" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Se connecter avec TikTok</button>
  </div>
</template>

<script lang="ts" setup>
import { createTiktokApi } from '~/services/tiktokApi';

const tiktokApi = createTiktokApi();

const connect = () => {
  tiktokApi.getAuthUrl();
}

const redirectToTikTok = ()  => {
  const clientKey = 'CLIENT_KEY'; // Remplacez par votre client_key
  // Pour le développement, utilisez http://localhost:3000/auth/tiktok/callback
  const redirectUri = encodeURIComponent('https://mon-projet-nuxt.com/auth/tiktok/callback'); 
  const scope = 'user.info.basic'; // Définissez les scopes nécessaires
  const responseType = 'code';
  const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${clientKey}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  
  window.location.href = authUrl;
}
</script>

<style scoped>
.tiktok-auth {
  text-align: center;
  margin-top: 50px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
}
</style>
