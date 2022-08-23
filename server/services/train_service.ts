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

import { ILegacyClusterClient } from "../../../../src/core/server";


export class TrainService {
  private osClient: ILegacyClusterClient;

  constructor(osClient: ILegacyClusterClient) {
    this.osClient = osClient;
  }

  trainModel = async (_context, req, res) => {
    const { callAsCurrentUser } = this.osClient.asScoped(req);
    // console.log(req.query, req.body, req);
    try{
      const resp = await callAsCurrentUser('ml_commons_train.trainModel', {
        ...req.query,
        methodName:"kmeans",
        async: false
      });

      console.log(resp);
      return res.ok({
        body: {
          ok: true,
        },
      });

    }catch (error){
      return res.ok({
        body: {
          ok: false,
          err: error.message,
        },
      });
    }
  };
}
