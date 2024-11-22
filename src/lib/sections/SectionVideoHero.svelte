<script lang="ts">
  import client from '../sanity-client'

  const { _id, _type } = $props()

  let data = $state(client.getSectionVideoHero(_id))
</script>

{#if data}
  {#await data}
    <p>Loading...</p>
  {:then data}
      <video autoplay loop muted playsinline src={data.videoUrl}></video>
      <img src={data.foregroundImageUrl} alt='Michael Kelley Film'/>
  {/await}
{:else}
  <p>Loading...</p>
{/if}

<style>
  video {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 0%);
    height: 100vh;
    min-height: 100vh;
    min-width: 100vw;
    background-size: cover;
    transition: all 500ms;
  }

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: auto;
  }
</style>
