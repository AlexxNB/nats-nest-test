import { Controller, Query, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  ListLogEntryQuery,
  LogEntryDto,
  LogListHandler,
} from './handlers/log-list.handler';
import {
  GetStatisticHandler,
  GetStatisticParam,
  StatisticDto,
} from './handlers/get-statistic.handler';
import { CreateLogEvent, InputLogEntryDto } from './events/create-log.event';

@Controller()
export class LogController {
  constructor(
    private logList: LogListHandler,
    private getStatistic: GetStatisticHandler,
    private createLog: CreateLogEvent,
  ) {}

  @Get('log')
  @ApiOkResponse({ type: [LogEntryDto] })
  async listLogEntries(@Query() query: ListLogEntryQuery) {
    return this.logList.handle(query);
  }

  @Get('statistic/:personalCode')
  // для сваггера
  @ApiOkResponse({ type: [StatisticDto] })
  async getStatisticByStudent(@Param() params: GetStatisticParam) {
    return this.getStatistic.handle(params.personalCode);
  }

  @MessagePattern('students.v1.graded')
  async createLogEntry(@Payload() payload: InputLogEntryDto) {
    return this.createLog.handle(payload);
  }
}
