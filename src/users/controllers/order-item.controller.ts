import { Body, Controller, Get,Put, Param, ParseIntPipe, Post, Delete } from '@nestjs/common';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemService } from '../services/order-item.service';

@Controller('order-item')
export class OrderItemController {
  
  constructor(private orderItemService: OrderItemService){}
  

  @Get('')
  findAll(){
    return this.orderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.orderItemService.findOne(id);
  }

  @Post('')
  create(@Body() payload: CreateOrderItemDto){
    return this.orderItemService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderItemDto
  ){
    return this.orderItemService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number){
    return this.orderItemService.delete(id);
  }
}
