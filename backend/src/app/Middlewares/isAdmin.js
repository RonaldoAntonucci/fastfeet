export default ({ auth: { isAdmin } }, res, next) => {
  if (!isAdmin) {
    return res.status(401).json({ error: 'Not permited, only for admins.' });
  }
  return next();
};
