<template>
  <div class="is_markdown" v-html="converter.makeHtml(texts)">

  </div>

</template>

<script setup>
import showdown from 'showdown'
import { defineProps } from 'vue';

const props = defineProps({
  texts: String
});

var converter = new showdown.Converter();
converter.setFlavor('github');

</script>

<style>
div.is_markdown * {
  all:revert !important;
}
</style>