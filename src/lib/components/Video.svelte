<script lang="ts">
  import client from '../sanity-client'
  import { PortableText } from '@portabletext/svelte'
  import { fadeInOnScroll } from '../actions/fadeInOnScroll'
  import { globalState } from '../state.svelte'
  import { fade } from 'svelte/transition';

  const { slug } = $props()

  let project = $state(client.getProject(slug))

  function unmountVideo() {
    globalState.mountedVideo = ''
  }
</script>

{#await project then project}
  <div transition:fade|global={{ duration: 200 }} class="container-fluid video-container d-flex vh-100 align-items-center">
    <div class="row vw-100">
      <div class="col-12 col-lg-6 video">
        <iframe
        title={project.name}
        src={`${project.url}?autoplay=1`}
        height="100%"
        width="100%"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        ></iframe>
      </div>
      <div class="col-12 col-lg-6 d-flex flex-column justify-content-center" use:fadeInOnScroll>
        <PortableText value={project.description} />
      </div>
    </div>
    <button onclick={unmountVideo} class="close-button">
      ×
    </button>
  </div>
{/await}

<style>
  .video {
    height: 400px;
  }

  .video-container {
    background-color: var(--background-color);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    color: gray;
  }
</style>
