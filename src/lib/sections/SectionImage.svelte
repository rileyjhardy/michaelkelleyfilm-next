<script lang="ts">
  import client from '../sanity-client'
  import { fadeInOnScroll } from '../actions/fadeInOnScroll'

  const { _id, _type } = $props()

  let section = $state(client.getSectionImage(_id))

</script>

{#await section then section}
  <div
    class="row justify-content-center"
    use:fadeInOnScroll>
    <img class="col-12 col-lg-6" src={client.urlFor(section.image).width(1200).url()} alt={section.title} />
  </div>

{/await}

<style>
  img {
    transition: opacity 0.5s ease-in-out;
  }
</style>
