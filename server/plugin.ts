import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import createTrainCluster from './clusters/create_train_cluster';
import createModelCluster from './clusters/create_model_cluster';
import { MlCommonsPluginSetup, MlCommonsPluginStart } from './types';
import { train, modelRouter } from './routes';
import { ModelService, TrainService } from './services';

export class MlCommonsPlugin implements Plugin<MlCommonsPluginSetup, MlCommonsPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('mlCommons: Setup');
    const router = core.http.createRouter();

    const trainOSClient = createTrainCluster(core);
    const modelOSClient = createModelCluster(core);

    // Register server side APIs
    // defineRoutes(router);

    const trainService = new TrainService(trainOSClient);
    const modelService = new ModelService(modelOSClient);

    const services = {
      trainService,
      modelService,
    }

    train(services, router);
    modelRouter(services, router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('mlCommons: Started');
    return {};
  }

  public stop() {}
}
