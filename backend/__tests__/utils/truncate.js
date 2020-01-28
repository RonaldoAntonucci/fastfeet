import User from '../../src/app/Schemas/UserSchema';

export default () => Promise.all([User.deleteMany({})]);
