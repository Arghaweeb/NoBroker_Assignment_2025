/**
 * Timer Extraction Utility
 * Intelligently extracts timer duration and context from recipe instruction text
 */

import { TimerInfo } from '../types/recipe-library';

interface DurationMatch {
  duration: number; // in seconds
  label?: string;
  confidence: number; // 0-1 score
}

/**
 * Extract timer information from instruction text
 * Recognizes patterns like:
 * - "Bake for 30 minutes"
 * - "Cook for 1 hour"
 * - "Let rest 15 mins"
 * - "Simmer 45-60 minutes"
 * - "Wait 2-3 hours"
 */
export function extractTimerFromText(text: string): TimerInfo | null {
  const matches = findAllDurationMatches(text);

  if (matches.length === 0) {
    return null;
  }

  // Sort by confidence and use the best match
  matches.sort((a, b) => b.confidence - a.confidence);
  const bestMatch = matches[0];

  if (bestMatch.confidence < 0.3) {
    return null; // Too low confidence
  }

  return {
    duration: bestMatch.duration,
    label: bestMatch.label,
    autoStart: false // User can manually start
  };
}

/**
 * Find all potential duration matches in text
 */
function findAllDurationMatches(text: string): DurationMatch[] {
  const matches: DurationMatch[] = [];
  const lowerText = text.toLowerCase();

  // Pattern 1: "X minutes/hours/seconds" with optional action verb
  const durationPatterns = [
    // "bake for 30 minutes", "cook for 1 hour"
    /(?:bake|cook|simmer|boil|rest|wait|chill|freeze|marinate|steep|roast|grill|fry|sauté|heat)(?:\s+(?:for|about|around))?\s+(\d+(?:\.\d+)?)\s*(minute|min|hour|hr|second|sec)s?/gi,

    // "for 30 minutes", "about 45 mins"
    /(?:for|about|around|approximately)\s+(\d+(?:\.\d+)?)\s*(minute|min|hour|hr|second|sec)s?/gi,

    // "30 minutes" at the end of sentence or followed by punctuation
    /(\d+(?:\.\d+)?)\s*(minute|min|hour|hr|second|sec)s?(?:\s*[,;.]|$)/gi,

    // Range patterns: "45-60 minutes", "2-3 hours"
    /(?:bake|cook|simmer|boil|rest|wait|chill|freeze|marinate|steep|roast|grill|fry|sauté|heat)?(?:\s+(?:for|about|around))?\s+(\d+)\s*-\s*(\d+)\s*(minute|min|hour|hr|second|sec)s?/gi,
  ];

  for (const pattern of durationPatterns) {
    let match;
    pattern.lastIndex = 0; // Reset regex state

    while ((match = pattern.exec(lowerText)) !== null) {
      const durationMatch = parseDurationMatch(match, lowerText);
      if (durationMatch) {
        matches.push(durationMatch);
      }
    }
  }

  return matches;
}

/**
 * Parse a regex match into a DurationMatch object
 */
function parseDurationMatch(match: RegExpExecArray, fullText: string): DurationMatch | null {
  const matchText = match[0];
  const matchIndex = match.index;

  // Extract duration value(s)
  let duration: number;
  let label: string | undefined;

  // Check if it's a range (e.g., "45-60 minutes")
  if (matchText.includes('-')) {
    const rangeMatch = matchText.match(/(\d+)\s*-\s*(\d+)/);
    if (rangeMatch) {
      const min = parseInt(rangeMatch[1]);
      const max = parseInt(rangeMatch[2]);
      duration = Math.ceil((min + max) / 2); // Use middle of range
    } else {
      return null;
    }
  } else {
    const numberMatch = matchText.match(/(\d+(?:\.\d+)?)/);
    if (!numberMatch) return null;
    duration = parseFloat(numberMatch[1]);
  }

  // Determine time unit
  const unit = matchText.match(/(minute|min|hour|hr|second|sec)/i)?.[1].toLowerCase();

  // Convert to seconds
  let durationInSeconds: number;
  if (unit?.startsWith('hour') || unit === 'hr') {
    durationInSeconds = duration * 3600;
  } else if (unit?.startsWith('minute') || unit === 'min') {
    durationInSeconds = duration * 60;
  } else if (unit?.startsWith('second') || unit === 'sec') {
    durationInSeconds = duration;
  } else {
    return null;
  }

  // Extract action verb for label
  const actionMatch = matchText.match(/(?:^|\s)(bake|cook|simmer|boil|rest|wait|chill|freeze|marinate|steep|roast|grill|fry|sauté|heat)/i);
  if (actionMatch) {
    label = actionMatch[1].charAt(0).toUpperCase() + actionMatch[1].slice(1);
  }

  // Calculate confidence based on context
  let confidence = 0.5; // Base confidence

  // Higher confidence if there's an action verb
  if (actionMatch) {
    confidence += 0.2;
  }

  // Higher confidence if it's at the start or end of sentence
  if (matchIndex < 20 || matchIndex > fullText.length - matchText.length - 20) {
    confidence += 0.1;
  }

  // Higher confidence if "for" is present
  if (matchText.includes('for')) {
    confidence += 0.15;
  }

  // Lower confidence for very short or very long durations (likely errors)
  if (durationInSeconds < 10 || durationInSeconds > 86400) { // < 10 sec or > 24 hours
    confidence -= 0.3;
  }

  return {
    duration: durationInSeconds,
    label,
    confidence: Math.min(Math.max(confidence, 0), 1) // Clamp to [0, 1]
  };
}

/**
 * Format duration in seconds to human-readable string
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes < 60) {
    if (remainingSeconds === 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    return `${minutes}m ${remainingSeconds}s`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Convert string array instructions to RecipeStep array with auto-detected timers
 */
export function enhanceInstructionsWithTimers(instructions: string[]) {
  return instructions.map(text => {
    const timer = extractTimerFromText(text);
    return {
      text,
      suggestedTimer: timer || undefined,
    };
  });
}
