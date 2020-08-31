<template>
  <el-calendar v-model="value"></el-calendar>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
    };
  },
};
</script>

<style lang="scss">
.el-calendar__body {
  padding: 12px 20px 9px;
}
</style>