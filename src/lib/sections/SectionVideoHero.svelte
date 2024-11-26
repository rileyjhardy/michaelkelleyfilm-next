<script lang="ts">
  import client from '../sanity-client'
  import { globalState } from '../state.svelte'

  const { _id } = $props()
  let isPlaying = $state(false)

  function handleVideoPlay() {
    setTimeout(() => {
      isPlaying = true
    }, 1000)
  }

  let section = $state(client.getSectionVideoHero(_id))

  function handlePlayButtonClick() {
    globalState.fullReelIsOpen = !globalState.fullReelIsOpen
  }
</script>

{#await section then section}
  <video
    autoplay
    loop
    muted
    playsinline
    src={section.videoUrl}
    onplaying={handleVideoPlay}
  >
  </video>
  {#if section.foregroundImageUrl}
    <img src={section.foregroundImageUrl} alt='Michael Kelley Film'/>
  {:else}
    <div class="video-hero-text" class:hide={globalState.menuIsOpen || !isPlaying}>
      <h1>Michael<br>Kelley</h1>
      <h2>Director / Cinematographer</h2>
    </div>

    <div class="play-button"
      onclick={handlePlayButtonClick}
      onkeypress={handlePlayButtonClick}
      role="button"
      tabindex="0"
      class:hide={globalState.menuIsOpen || !isPlaying}
    >
      <svg
        version="1.1"
        id="Layer_1"
        width="40"
        height="68.40690978886755"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 52 60"
      >
        <path
          fill="white"
          d="M0,0v60l52-30L0,0z M3,5.2L46,30L3,54.8V5.2z"
        ></path>
        <path
          fill="white"
          class="play-button-effect"
          d="M0,0v60l52-30L0,0z"
        ></path>
      </svg>
    </div>
  {/if}
{/await}

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
    top: 40%;
    transition: all 0.7s ease;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;

    h1 {
      font-size: 7rem;
      text-transform: uppercase;
      line-height: 1;

      @media (max-width: 768px) {
        font-size: 4rem;
      }
    }

    h2 {
      font-size: 2rem;
      font-style: italic;
      line-height: 1;
      font-size: 1.5rem;
    }
  }

  .video-hero-text.hide {
    opacity: 0;
    transform: translate(-50%, -40%);
  }

  .play-button {
    position: absolute;
    left: 50%;
    bottom: 30%;
    transform: translate(-50%, -20%);
    cursor: pointer;
    font-size: 50px;
    opacity: 1;
    transition: 500ms;
  }

  .play-button-effect {
    stroke-width: 3px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .play-button-effect:hover {
    transform-origin: 0 0;
    opacity: 1;
  }

  .hide {
    opacity: 0;
  }
</style>
