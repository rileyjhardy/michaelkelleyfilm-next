<script lang="ts">
  import client from '../sanity-client'
  import { PortableText } from '@portabletext/svelte'
  import { DoubleBounce } from 'svelte-loading-spinners'
  import { Link } from 'svelte-routing'

  const { slug } = $props()

  let project = $state(client.getProject(slug))
</script>

{#await project}
  <div class="flex justify-center items-center h-screen">
    <DoubleBounce />
  </div>
{:then project}
  <div class="container d-flex vh-100 align-items-center">
    <div class="row vw-100">
      <div class="col-12 col-lg-6 video-container">
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
      <div class="col-12 col-lg-6 d-flex flex-column justify-content-center">
        <PortableText value={project.description} />
      </div>
    </div>
    <Link to="/" preserveScroll>
      <button class="close-button">
        ×
      </button>
    </Link>
  </div>
{/await}

<style>
  .video-container {
    height: 400px;
  }

  .container {
    color: gray;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
  }

  .close-button:hover {
    transform: scale(1.1);
  }
</style>
