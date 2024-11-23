<template>
  <div>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia id excepturi temporibus culpa ut ducimus libero
      voluptates provident cumque repellat delectus, odit tenetur. Cupiditate quidem obcaecati dolor nostrum sint
      blanditiis!</p>
  </div>
  <pre>
    {{ response.meta }}
  </pre>
</template>

<script lang="ts" setup>
import { AnimeRepository, RepositoryFactory } from "@/repositories/repositoryFactory"

const anime = RepositoryFactory.get<AnimeRepository>('anime')

const response = await anime.getAllWithPagination();



//
</script>

<style></style>