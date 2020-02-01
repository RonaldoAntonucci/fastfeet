import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number()
        .integer()
        .positive()
        .required(),
      deliverymanId: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    await schema.validate(
      { ...req.body, deliverymanId: req.params.deliverymanId },
      { abortEarly: false }
    );

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
