import Yup from 'yup';

export const UserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  firstName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(50, 'Nice try, nobody has a first name that long')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(50, 'Nice try, nobody has a last name that long')
    .required('Required')
});

export const isRequiredBySchema = (schema, name) =>
  Yup.reach(schema, name)
    .describe()
    .tests.some(test => test === 'required');
