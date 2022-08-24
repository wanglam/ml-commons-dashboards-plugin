/*
 *   Copyright OpenSearch Contributors
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import { schema } from '@osd/config-schema';
import { IRouter } from "../../../../src/core/server";

export default function (services, router: IRouter) {
  const { modelService } = services;

  router.get(
    {
      path: '/api/model',
      // validate: {
      //   query: schema.object({
      //     methodName: schema.string(),
      //   }),
      //   body: schema.any(),
      // }
      validate: false
    },
    modelService.search
  );   
}