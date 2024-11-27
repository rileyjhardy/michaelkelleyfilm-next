<script lang="ts">
  import client from '../sanity-client'
  import { fadeInOnScroll } from '../actions/fadeInOnScroll'
  import { globalState } from '../state.svelte'
  const { _id, _type } = $props()

  let section = $state(client.getSectionProjectGallery(_id))

  const mountVideo = (slug: string) => {
    globalState.mountedVideo = slug
  }
</script>

{#await section then section}
  <div class="project-gallery">
    {#each section.projects as project}
      <div
        onclick={() => mountVideo(project.slug.current)}
        onkeypress={() => mountVideo(project.slug.current)}
        role="button"
        tabindex="0"
        class="project-gallery-item"
        use:fadeInOnScroll
      >
        <h3 class="project-gallery-item__title">{project.name}</h3>
        <img src={client.urlFor(project.thumbnail).width(500).url()} alt={project.name} />
      </div>
    {/each}
  </div>
{/await}

<style>
  .project-gallery {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 0 auto;
    /* padding: 0 2rem; */

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    @media (min-width: 768px) {
      padding: 0 2rem;
    }
  }

  .project-gallery-item {
    position: relative;

    img {
      width: 100%;
      height: auto;
      display: block;
      transition: all 0.5s ease;
    }

    img:hover {
      filter: blur(3px);
      opacity: 0.5;
    }
  }

  .project-gallery-item__title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-decoration: none;
    color: white;
    font-size: 1rem;
    white-space: nowrap;
    z-index: 1;
  }
</style>
