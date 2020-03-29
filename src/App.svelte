<script>
  export let version;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
</script>

<main>
  <h1>Hello</h1>
  <p>{version}</p>
</main>
