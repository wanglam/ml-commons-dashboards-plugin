import { ModelService } from './model_service';

const serviceInstanceStore: {
  model: ModelService | undefined;
} = { model: undefined };

const serviceClassStore = { model: ModelService };

export class ServiceProvider {
  public static getService(type: keyof typeof serviceInstanceStore) {
    if (!serviceInstanceStore[type]) {
      const ServiceClass = serviceClassStore[type];
      serviceInstanceStore[type] = new ServiceClass();
    }
    return serviceInstanceStore[type]!;
  }
}
