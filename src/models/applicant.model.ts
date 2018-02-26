export enum ApplicantStatus {
  IN_QUEUE = "In Queue",
  PHONE_SCREEN = "Phone Screen",
  ON_SITE = "On Site",
  APPROVAL = "Approval"
}

export interface Applicant {
  // Is populated when reading from DB, unpopulated in POST.
  _id?: string;

  name: string;
  jobTitle: string;
  jobDescription: string;
  // Differentiators for when names match.
  address?: string;
  email?: string;

  // Defaults to "In Queue" if not provided in POST.
  status?: ApplicantStatus;
}
