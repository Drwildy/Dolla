FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
WORKDIR /src
COPY ["DollaWeb/DollaWeb.csproj", "DollaWeb/"]
RUN dotnet restore "DollaWeb/DollaWeb.csproj"
COPY . .
WORKDIR "/src/DollaWeb"
RUN dotnet build "DollaWeb.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "DollaWeb.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "DollaWeb.dll"]