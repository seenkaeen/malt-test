import {
  Sprout,
  Sparkles,
  Scissors,
  Snowflake,
  Droplets,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceArt } from '../data/services'

export const serviceIcon: Record<ServiceArt, LucideIcon> = {
  lawn: Sprout,
  window: Sparkles,
  hedge: Scissors,
  snow: Snowflake,
  pressure: Droplets,
}
