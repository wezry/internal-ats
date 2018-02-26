import { QuestionTag } from './question-tag.model';

export interface Question {
  // Is populated when reading from DB, unpopulated in POST.
  _id?: string;
  text: string;

  tags?: QuestionTag[];
}
