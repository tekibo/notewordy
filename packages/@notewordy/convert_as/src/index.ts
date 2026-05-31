import {
  lachit_geet_uni,
  lachit_uni_geet,
  lachit_sanitiser,
  applyMappings,
} from './mappings.js';

export interface ConvertOptions {
  /** Whether to sanitise/spell-correct the text before conversion */
  sanitise?: boolean;
}

/**
 * Convert text from Geetanjali (legacy font) encoding to Unicode.
 * @param text - Input text in Geetanjali font encoding
 * @returns Unicode Assamese text
 */
export function geetToUni(text: string, options?: ConvertOptions): string {
  let result = applyMappings(text, lachit_geet_uni);
  if (options?.sanitise) {
    result = sanitise(result);
  }
  return result;
}

/**
 * Convert text from Unicode Assamese to Geetanjali (legacy font) encoding.
 * @param text - Input text in Unicode Assamese
 * @returns Geetanjali font encoded text
 */
export function uniToGeet(text: string, options?: ConvertOptions): string {
  let result = applyMappings(text, lachit_uni_geet);
  if (options?.sanitise) {
    result = sanitise(result);
  }
  return result;
}

/**
 * Sanitise and spell-correct Assamese text.
 * Performs spelling correction and punctuation normalisation.
 * @param text - Input text to sanitise
 * @returns Sanitised text
 */
export function sanitise(text: string): string {
  return applyMappings(text, lachit_sanitiser);
}

export type { ReplaceMapping } from './mappings.js';
