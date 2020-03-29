<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
</script>

<main>
  <h1>Hello</h1>
  <p>{new Date()}</p>
</main>
