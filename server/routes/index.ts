// import { IRouter } from '../../../../src/core/server';

// export function defineRoutes(router: IRouter) {
//   router.get(
//     {
//       path: '/api/ml_commons/example',
//       validate: false,
//     },
//     async (context, request, response) => {
//       return response.ok({
//         body: {
//           time: new Date().toISOString(),
//         },
//       });
//     }
//   );
// }

export {
  default as train
} from "./train";
