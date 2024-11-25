<script lang="ts">
  import client from '../sanity-client'
  import { fadeInOnScroll } from '../actions/intersectionObserver'
  const { _id } = $props()

  const section = $state(client.getSectionContact(_id))
  let isOverlayVisible = $state(false);

  function toggleOverlay() {
    isOverlayVisible = !isOverlayVisible;
  }
</script>

{#await section}
  <p>Loading...</p>
{:then section}
  <div class="section-contact" use:fadeInOnScroll>
    {#each section.contact.socialLinks as socialMedia}
      <a href={socialMedia.url} target="_blank" rel="noopener noreferrer" aria-label={socialMedia.name}>
        <i class={socialMedia.icon}></i>
      </a>
    {/each}
  </div>
  
  <div class="section-contact-button" use:fadeInOnScroll>
    <button onclick={toggleOverlay}>
      Contact
    </button>
  </div>

  <div class="contact-overlay" class:visible={isOverlayVisible}>
    <button class="close-button" onclick={toggleOverlay}>
      ×
    </button>
    
    <div class="contact-buttons">
      <a href="mailto:{section.contact.email}" class="contact-button">
        Email
      </a>
      <a href="tel:{section.contact.phone}" class="contact-button">
        Call
      </a>
    </div>
  </div>
{/await}

<style>
  
  .section-contact {
    display: flex;
    align-items: center;
    justify-content: center;
    
    i {
      font-size: 2rem;
      margin: 0 1rem;
      color: white;
    }
  }

  .section-contact-button {
    text-align: center;

    button {
      margin-top: 3rem;
      border: 1px solid var(--text-color);
      background-color: transparent;
      color: var(--text-color);
      padding: 1rem;
      transition: all 0.3s ease;
    }
  
    button:hover {
      background-color: var(--text-color);
      color: var(--background-color);
    }
  }

  .contact-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    z-index: 100;
    transition: all 0.3s ease;
    opacity: 0;
    pointer-events: none;
  }

  .contact-overlay.visible {
    opacity: 1;
    pointer-events: all;
  }

  .contact-buttons {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .contact-button {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--background-color);
    color: var(--text-color);
    text-decoration: none;
    border: 1px solid var(--text-color);
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }

  .contact-button:hover {
    background-color: var(--text-color);
    color: var(--background-color);
  }
</style>
