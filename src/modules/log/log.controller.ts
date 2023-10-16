import { Controller, Query, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LogService } from './log.service';
import {
  InputLogEntryDto,
  ListLogEntryQuery,
  GetStatisticParam,
  LogEntryDto,
  StatisticDto,
} from './dto/log.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class LogController {
  constructor(private logService: LogService) {}

  @Get('log')
  @ApiOkResponse({ type: [LogEntryDto] })
  async listLogEntries(@Query() query: ListLogEntryQuery) {
    return this.logService.list(query.cursor, query.limit);
  }

  @Get('statistic/:personalCode')
  // для сваггера
  @ApiOkResponse({ type: [StatisticDto] })
  async etStatisticByStudent(@Param() params: GetStatisticParam) {
    return this.logService.getStatistic(params.personalCode);
  }

  @MessagePattern('students.v1.graded')
  async createLogEntry(@Payload() payload: InputLogEntryDto) {
    return this.logService.create(payload);
  }
}
