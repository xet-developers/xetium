using Domain.Entity;
using MassTransit;
using PositionConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Request;
using ProfileConnectionLib.ConnectionServices.DtoModels.Response;
using Services.Interfaces;

namespace Api.Controllers.Consumers
{
    public class DeleteProjectInfoConsumer : IConsumer<DeleteProjectInfoRequestDto>
    {
        private readonly IScheduleService _scheduleService;
        public DeleteProjectInfoConsumer(IScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        public async Task Consume(ConsumeContext<DeleteProjectInfoRequestDto> context)
        {
            var info = context.Message;
            var res = await _scheduleService.DeleteProjectInfoAsync(info.ProjectId);


            await context.RespondAsync(new DeleteProjectInfoResponseDto()
            {
                State = res
            });
        }
    }
}
