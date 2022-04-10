<template>
  <div>
    <Todo id="gsap" />
    <Googlemap id="gsap" />
  </div>
</template>
<script>
import gsap from 'gsap'
export default {
  mounted() {
    gsap.from('#gsap', { x: 1000, duration: 1 })
  }
}
</script>
