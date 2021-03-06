import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object()
      .shape({
        name: Yup.string().min(3),
        password: Yup.string()
          .min(6)
          .required(),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password')])
          .required(),
      })
      .required();

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
