import { Serializer, OutgoingResponse } from '@nestjs/microservices';

export class RequestSerializer implements Serializer {
  serialize(value: any): OutgoingResponse {
    return {
      ...value,
      data: JSON.stringify(value.data),
    };
  }
}
