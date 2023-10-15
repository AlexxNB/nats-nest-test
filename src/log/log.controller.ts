import { Controller, Query, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LogService } from './log.service';
import {
  InputLogEntryDto,
  ListLogEntryQuery,
  GetStatisticParam,
} from './dto/log.dto';

@Controller()
export class LogController {
  constructor(private logService: LogService) {}

  @Get('log')
  async listLogEntries(@Query() query: ListLogEntryQuery) {
    return this.logService.list(query.cursor, query.limit);
  }

  @Get('statistic/:personalCode')
  async etStatisticByStudent(@Param() params: GetStatisticParam) {
    return this.logService.getStatistic(params.personalCode);
  }

  @MessagePattern('students.v1.graded')
  async createLogEntry(@Payload() payload: InputLogEntryDto) {
    return this.logService.create(payload);
  }
}
