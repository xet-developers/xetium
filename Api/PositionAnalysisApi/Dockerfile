FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 7133
ENV ASPNETCORE_URLS=http://*:7133/

COPY ["/Libs", " Libs/"]

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Api/PositionAnalysisApi/Api/Api.csproj", "Api/PositionAnalysisApi/Api/Api.csproj"]
RUN dotnet restore "Api/PositionAnalysisApi/Api/Api.csproj"
COPY . .
WORKDIR "/src/Api/PositionAnalysisApi/Api/"
RUN dotnet build "Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api.dll"]
