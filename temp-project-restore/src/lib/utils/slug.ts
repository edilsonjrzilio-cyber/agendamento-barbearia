import { RESERVED_SLUGS, SLUG_REGEX, SlugValidation } from '@/lib/types/tenant'

export function validateSlug(slug: string): SlugValidation {
  if (!slug) {
    return { valid: false, message: 'Slug é obrigatório' }
  }

  if (!SLUG_REGEX.test(slug)) {
    return { 
      valid: false, 
      message: 'Slug deve conter apenas letras minúsculas, números e hífens (3-32 caracteres)' 
    }
  }

  if (RESERVED_SLUGS.includes(slug)) {
    return { 
      valid: false, 
      message: 'Este slug é reservado pelo sistema',
      suggestions: [
        `${slug}-barbearia`,
        `${slug}-cuts`,
        `${slug}-barber`,
        `meu-${slug}`,
        `${slug}-shop`
      ]
    }
  }

  return { valid: true }
}

export function generateSlugSuggestions(nome: string): string[] {
  const base = nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-|-$/g, '') // Remove hífens no início/fim

  const suggestions = [
    base,
    `${base}-barbearia`,
    `${base}-cuts`,
    `${base}-barber`,
    `${base}-shop`,
    `barbearia-${base}`,
    `${base}-${Math.floor(Math.random() * 999)}`
  ]

  return suggestions
    .filter(s => SLUG_REGEX.test(s) && !RESERVED_SLUGS.includes(s))
    .slice(0, 5)
}

export function formatSlugInput(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 32)
}