import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppErrorFilterProvider } from './app-error.filter.js'
import { ErrorHandler } from './error-handler.js'

@Module({
  imports: [ConfigModule],
  providers: [ErrorHandler, AppErrorFilterProvider],
  exports: [ErrorHandler]
})
export class AppErrorModule {}
