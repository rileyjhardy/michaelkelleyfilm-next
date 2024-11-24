<script lang="ts">
  import client from '../sanity-client'

  const config = $state(client.getGlobalConfig())
</script>

{#await config}
  <p>Loading...</p>
{:then config}
  <div class="video-container">
    <iframe
      class="mx-auto"
      title='Full Reel'
      src={`${config.vimeoReel}?autoplay=1`}
      width="896px"
      height="504px"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
{/await}

<style>
  .video-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: var(--background-color);
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-100%);
  }
</style>
