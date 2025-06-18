export type AboutForm = {
  username: string;
  description: string;
};

export type AvatarForm = {
  selectedAvatarSet: number | null;
  dialogue: string | null;
  mistake: string | null;
  congratulations: string | null;
};

export type SocialMediaForm = {
  instagram: string;
  youtube: string;
  facebook: string;
};
