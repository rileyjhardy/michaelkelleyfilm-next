import { createClient, type ClientConfig, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export class SanityService {
  private client: SanityClient
  private builder: ReturnType<typeof imageUrlBuilder>

  constructor(config?: Partial<ClientConfig>) {
    this.client = createClient({
      projectId: '8fwxmm43',
      dataset: 'production',
      apiVersion: '2024-09-18',
      useCdn: true,
    })
    this.builder = imageUrlBuilder(this.client)
  }

  urlFor(source: SanityImageSource) {
    return this.builder.image(source)
  }

  async getPage(slug: string) {
    return this.client.fetch(`*[_type == "page" && slug.current == $slug][0] {
      ...,
      sections[]-> { _id, _type }
    }`, { slug })
  }

  async getSection(id: string) {
    return this.client.fetch(`*[_id == $id][0]`, { id })
  }

  async getSectionVideoHero(id: string) {
    return this.client.fetch(`*[_id == $id][0] {
      ...,
      "videoUrl": video.asset->url,
      "foregroundImageUrl": foregroundImage.asset->url
    }`, { id })
  }

  async getSectionProjectGallery(id: string) {
    return this.client.fetch(`*[_id == $id][0] {
      ...,
      projects[]->
    }`, { id })
  }

  async getSectionImage(id: string) {
    return this.client.fetch(`*[_id == $id][0]`, { id })
  }

  async getSectionContact(id: string) {
    return this.client.fetch(`*[_id == $id][0] {
      ...,
      contact->{
        ...,
        socialLinks[]->
      }
    }`, { id })
  }

  async getGlobalConfig() {
    return this.client.fetch(`*[_type == "globalConfig"][0] {
      ...,
      socialLinks[]->
    }`)
  }

  async getMenu() {
    return this.client.fetch(`*[_type == "menu"][0] {
      ...,
      items[]->
    }`)
  }

  async getProject(slug: string) {
    return this.client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug })
  }
}

// Create a singleton instance
export const sanityService = new SanityService()

// Export default instance for convenience
export default sanityService
