FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["../../Libs/PositionConnectionLib/PositionConnectionLib.csproj", "../../Libs/PositionConnectionLib/"]
RUN dotnet restore "../../Libs/PositionConnectionLib/PositionConnectionLib.csproj"
COPY . .
WORKDIR "/src/../../Libs/PositionConnectionLib"
RUN dotnet build "PositionConnectionLib.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "PositionConnectionLib.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PositionConnectionLib.dll"]
