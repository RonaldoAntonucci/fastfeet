import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number()
        .integer()
        .positive()
        .required(),
      deliveryman_id: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (req.body && req.params) {
      req.body.deliveryman_id = Number(req.params.deliverymanId);
    }

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
