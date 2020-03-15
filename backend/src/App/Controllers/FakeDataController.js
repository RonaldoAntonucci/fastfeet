// import Factory from '../../../__tests__/utils/factories';

// import Cache from '../../Lib/Cache';

// export default {
//   async index({ query }, res) {
//     let result = [];

//     if (query.deliveries) {
//       result += await Factory.createMany('Delivery', 100, {
//         start_date: new Date(),
//         end_date: new Date(),
//       });
//     }

//     if (query.problems) {
//       result += await Factory.createMany('Problem', 100);
//     }

//     if (query.deliverymanId) {
//       result += await Factory.createMany('Delivery', 100, {
//         start_date: new Date(),
//         deliveryman_id: query.deliverymanId,
//       });
//     }

//     await Cache.invalidatePrefixes(['*']);
//     return res.json(result);
//   },
// };
