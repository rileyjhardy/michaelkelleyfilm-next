<script lang="ts">
  import client from '../sanity-client'
  import { globalState } from '../state.svelte'

  const config = $state(client.getGlobalConfig())

  function handleCloseButtonClick() {
    globalState.fullReelIsOpen = !globalState.fullReelIsOpen
  }
</script>

{#await config then config}
  <div class="video-container" class:show={globalState.fullReelIsOpen}>
    <iframe
      class="mx-auto"
      title='Full Reel'
      src={config.vimeoReel}
      width="896px"
      height="504px"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    ></iframe>
    <button class="close-button" onclick={handleCloseButtonClick}>
      ×
    </button>
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
    transition: transform 0.7s ease;
  }

  .video-container.show {
    transform: translateY(0);
  }
</style>
