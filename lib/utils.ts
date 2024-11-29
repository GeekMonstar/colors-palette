import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomColor(){
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
}

export function generatePalette(count: number): string[] {
    return Array.from({ length: count }, generateRandomColor)
  }

