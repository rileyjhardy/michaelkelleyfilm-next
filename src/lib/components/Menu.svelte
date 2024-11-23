<script lang="ts">
  import client from '../sanity-client'
  import { camelToKebab } from '../utils'

  let { open, toggleMenu } = $props()
  let menu = $state(client.getMenu())
</script>

{#await menu}
  <p>Loading menu...</p>
{:then menu}
  <div class="menu" class:visible={open}>
    <nav>
      <ul>
        {#each menu.items as item}
          <li>
            <a 
              href={`#${camelToKebab(item._type)}`} 
              onclick={toggleMenu}>
              {item.title}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/await}

<style>
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: black;
    z-index: 1000;
    opacity: 0.85;
    pointer-events: none;
    transition: all 0.7s ease;
    transform: translateY(-100%);
  }

  .menu.visible {
    pointer-events: all;
    transform: translateY(0);
  }

  nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
  }

  li {
    color: var(--text-color);
    font-size: 3rem;

    a {
      text-decoration: none;
      color: var(--text-color);
      transition: color 0.2s ease;
    }

    a:hover {
      color: gray;
    }
  }
</style>
