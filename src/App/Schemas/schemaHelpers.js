import { reach } from 'yup';

export const isRequiredBySchema = (schema, name) =>
  reach(schema, name)
    .describe()
    .tests.some(test => test === 'required');
