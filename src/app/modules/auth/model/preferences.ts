import { JsonProperty } from '~app/shared/json-mapper';

export class AuthUserPreferences {
  id: number | undefined = undefined;

  language: string | undefined = undefined;

  @JsonProperty('ianaTimeZone')
  timezone: string | undefined = undefined;
}

export type AuthUserPreferencesForm = Pick<AuthUserPreferences, 'id' | 'language' | 'timezone'>;
