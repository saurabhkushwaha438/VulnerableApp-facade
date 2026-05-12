export interface VulnerabilityType {
  identifierType: string;
  value: string;
}

/**
 * Hints are to help user to crack the vulnerability level (Scanner Mode)
 */
export interface Hint {
  vulnerabilityTypes: Array<VulnerabilityType>;
  description: string;
}

/**
 * Challenge Mode Hint (NEW - matches your JSON)
 */
export interface ChallengeHint {
  order: number;
  text: string;
}

export enum ResourceType {
  HTML = "HTML",
  JAVASCRIPT = "JAVASCRIPT",
  CSS = "CSS",
}

export class ResourceURI {
  resourceType: ResourceType = ResourceType.HTML;
  isAbsolute: boolean = false;
  uri: string = "/";
}

export interface ResourceInformation {
  htmlResource: ResourceURI;
  staticResources: Array<ResourceURI>;
}

export interface Payload {
  description?: string;
  value: string;
}

/**
 * Challenge Mode Structure (UPDATED)
 */
export interface Challenge {
  challengeText: string;
  hints?: Array<ChallengeHint>;
  hintCards?: Array<{ hints: string[] }>;
  payload?: Payload;
}

/**
 * Information about the Level present in the Vulnerability.
 */
export interface LevelInformation {
  levelIdentifier: string;
  variant: string;

  // Scanner mode hints (unchanged)
  hints: Array<Hint>;

  resourceInformation: ResourceInformation;

  // Challenge mode
  challengeCards?: Array<Challenge>;
  challenge?: Challenge;
}

/**
 * Vulnerability Definition
 */
export interface VulnerabilityDefinition {
  name: string;
  id: string;
  description: string;
  vulnerabilityTypes: Array<VulnerabilityType> | null;
  levels: Array<LevelInformation>;
}

/**
 * Application State
 */
export interface ApplicationState {
  applicationName: string;
  vulnerabilityDefinitions: Array<VulnerabilityDefinition>;
}

/**
 * Global State
 */
export interface GlobalState {
  applicationData?: Array<ApplicationState>;
  activeApplication?: string;
  activeVulnerability?: string;
  activeLevel?: string;
  isSuccessfullyLoaded: boolean;
  activateHomePage: boolean;
  activateAboutUsPage: boolean;
  showHints: boolean;
  isChallengeModeEnabled: boolean;
}

// enum for setting the effective mode

export enum AppMode {
  CHALLENGE = "CHALLENGE",
  SCANNER = "SCANNER",
}
