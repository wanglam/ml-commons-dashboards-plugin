import { Model } from './model';
import { Task } from './task';

const apiInstanceStore: {
  model: Model | undefined;
  task: Task | undefined;
} = { model: undefined, task: undefined };

const apiClassStore = { model: Model, task: Task };

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
