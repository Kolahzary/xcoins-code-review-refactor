import { Controller, Get, NotFoundException } from '@nestjs/common'

@Controller()
export class AppController {
  constructor() {}

  @Get()
  get() {
    throw new NotFoundException()
  }
}
