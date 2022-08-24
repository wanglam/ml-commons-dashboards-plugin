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
import { IRouter } from '../../../../src/core/server';
import { ModelService, TrainService } from '../services';
import { ModelNotFound } from '../services/model_service';
import { MODEL_API_ENDPOINT } from './constants';

export default function (
  services: { modelService: ModelService; trainService: TrainService },
  router: IRouter
) {
  const { modelService, trainService } = services;

  router.post(
    {
      path: MODEL_API_ENDPOINT,
      validate: {
        body: schema.object({
          methodName: schema.string(),
          body: schema.any(),
        }),
      },
    },
    async (_context, request) => {
      const { methodName, body } = request.body;
      try {
        const payload = await trainService.trainModel({
          methodName,
          async: true,
          request,
          body,
        });

        return {
          status: 200,
          payload,
          options: {},
        };
      } catch (err) {
        return {
          status: 400,
          payload: {
            msg: err.message,
          },
          options: {},
        };
      }
    }
  );

  router.get(
    {
      path: MODEL_API_ENDPOINT,
      validate: {
        query: schema.object({
          algorithm: schema.maybe(schema.string()),
          pagination: schema.object({
            currentPage: schema.number(),
            pageSize: schema.number(),
          }),
        }),
      },
    },
    async (_context, request) => {
      try {
        const payload = await modelService.search({ request, ...request.query });
        return {
          status: 200,
          payload,
          options: {},
        };
      } catch (err) {
        return {
          status: 400,
          payload: {
            msg: err.message,
          },
          options: {},
        };
      }
    }
  );

  router.delete(
    {
      path: `${MODEL_API_ENDPOINT}/{modelId}`,
      validate: {
        params: schema.object({
          modelId: schema.string(),
        }),
      },
    },
    async (_context, request) => {
      try {
        await modelService.delete({
          request,
          modelId: request.params.modelId,
        });
        return {
          status: 200,
          options: {},
        };
      } catch (err) {
        if (err instanceof ModelNotFound) {
          return {
            status: 404,
            options: {},
          };
        }
        return {
          status: 400,
          payload: {
            msg: err.message,
          },
          options: {},
        };
      }
    }
  );
}
