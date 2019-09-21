FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base

# Setup NodeJs
RUN apt-get update -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash --debug
Run apt-get install nodejs -yq
# End setup

WORKDIR /app
EXPOSE 80
EXPOSE 443
EXPOSE 49153

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