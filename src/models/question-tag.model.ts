export interface QuestionTag {
  // Is populated when reading from DB, unpopulated in POST.
  _id?: string;
  text: string;
}
