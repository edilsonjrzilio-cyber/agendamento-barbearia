import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function formatTime(time: string): string {
  return time.slice(0, 5) // Remove seconds from HH:MM:SS
}

export function calculateDaysRemaining(expirationDate: string): number {
  const expiration = new Date(expirationDate)
  const today = new Date()
  const diffTime = expiration.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function generateTimeSlots(startTime: string, endTime: string, intervalMinutes: number = 30): string[] {
  const slots: string[] = []
  const start = new Date(`2024-01-01T${startTime}:00`)
  const end = new Date(`2024-01-01T${endTime}:00`)
  
  let current = new Date(start)
  
  while (current < end) {
    slots.push(current.toTimeString().slice(0, 5))
    current.setMinutes(current.getMinutes() + intervalMinutes)
  }
  
  return slots
}

export function isTimeSlotAvailable(slot: string, bookedSlots: string[]): boolean {
  return !bookedSlots.includes(slot)
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/
  return phoneRegex.test(phone)
}

export function formatPhoneNumber(phone: string): string {
  const numbers = phone.replace(/\D/g, '')
  if (numbers.length === 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (numbers.length === 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return phone
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}