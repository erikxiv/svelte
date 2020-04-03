<script context="module">
  // let match = (re) => {
  //   return re.test(window.location.pathname);
  // }
  // param: (re, name) => {
  //   const match = re.exec(window.location.pathname);
  //   return match && match.groups && match.groups[name];
  // },
  // query: () => {
  //   // return object with all params
//  }
  export let query = window.location.pathname;
</script>
<script>
  // import router from '../router';

  // export let path;
</script>

<!-- {#if router.match(path)} -->
  <slot></slot>
<!-- {/if} -->
