export interface Response {
  // Is populated when reading from DB, unpopulated in POST.
  _id?: string;

  applicantId: string;
  questionId: string;
  text: string;
}
