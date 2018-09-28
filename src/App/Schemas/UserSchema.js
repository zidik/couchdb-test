import { string, object } from 'yup';

export const UserSchema = object().shape({
  email: string()
    .email('Invalid email address')
    .required('Required'),
  firstName: string()
    .min(2, 'Must be longer than 2 characters')
    .max(50, 'Nice try, nobody has a first name that long')
    .required('Required'),
  lastName: string()
    .min(2, 'Must be longer than 2 characters')
    .max(50, 'Nice try, nobody has a last name that long')
    .required('Required')
});
