import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NatsService {
  constructor(@Inject('NATS_SERVICE') private nats: ClientProxy) {}

  /** Send event to the NATS server */
  async publish(topic: string, data: object) {
    return new Promise((resolve, reject) => {
      try {
        const publishObservable = this.nats.emit(topic, data);
        const sub = publishObservable.subscribe(() => {
          resolve(true);
          sub.unsubscribe();
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  /** Send request to the NATS server and wait for response */
  async request<T>(topic: string, data: object): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const requestObservable = this.nats.send(topic, data);
        const sub = requestObservable.subscribe((value) => {
          resolve(value);
          sub.unsubscribe();
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
