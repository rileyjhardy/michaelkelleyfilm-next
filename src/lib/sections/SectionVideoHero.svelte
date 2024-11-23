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
    {#if data.foregroundImageUrl}
      <img src={data.foregroundImageUrl} alt='Michael Kelley Film'/>
    {:else}
      <div class="video-hero-text">
        <h1>Michael<br>Kelley</h1>
        <h2>Director / Cinematographer</h2>
      </div>
    {/if}
  {/await}
{:else}
  <p>Loading...</p>
{/if}

<style>
  video {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    height: 100vh;
    min-height: 100vh;
    min-width: 100vw;
  }

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: auto;
  }

  .video-hero-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;

    h1 {
      font-size: 7rem;
      text-transform: uppercase;
      line-height: 1;
    }

    h2 {
      font-size: 2rem;
      font-style: italic;
      line-height: 1;
      font-size: 1.5rem;
    }
  }
</style>
