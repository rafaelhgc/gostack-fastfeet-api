import Bee from 'bee-queue';

import DeliveryAvailable from '../app/jobs/DeliveryAvailable';
import DeliveryNotAvailable from '../app/jobs/DeliveryNotAvailable';

import RedisConfig from '../config/RedisConfig';

const jobs = [DeliveryAvailable, DeliveryNotAvailable];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: RedisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  process() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailed).process(handle);
    });
  }

  handleFailed(job, err) {
    console.log(`Queue ${job.queue.name} failed`, err);
  }
}

export default new Queue();
