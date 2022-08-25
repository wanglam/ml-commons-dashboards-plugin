import { Model } from './model';

const apiInstanceStore: {
  model: Model | undefined;
} = { model: undefined };

const apiClassStore = { model: Model };

export class APIProvider {
  public static getAPI(type: keyof typeof apiInstanceStore) {
    if (!apiInstanceStore[type]) {
      const APIClass = apiClassStore[type];
      apiInstanceStore[type] = new APIClass();
    }
    return apiInstanceStore[type]!;
  }
  public static clear() {
    apiInstanceStore.model = undefined;
  }
}
