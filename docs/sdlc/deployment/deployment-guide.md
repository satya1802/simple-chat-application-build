# Deployment Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start how-it-deploys -->
Pushes to `main` run `.github/workflows/deploy.yml`, which builds the API image (if there is a backend) and deploys the SPA to AWS Amplify. Commits touching only `docs/sdlc/**` don't deploy. Deployments can also be started from the platform's Deployment tab.
<!-- sdlc:auto:end how-it-deploys -->

<!-- sdlc:auto:start environments -->
| Name | Service | Runtime | Scaling | Environment |
|---|---|---|---|---|
| React SPA | Static web app (S3 + CloudFront) | Browser (React 19 build) | CDN edge, static | dev |
| FastAPI Service | Containerised backend (ECS Fargate or EC2) | Python 3.12 / FastAPI 0.115 / Uvicorn | Single small task at demo volume | dev |
| PostgreSQL | Amazon RDS for PostgreSQL 16 | PostgreSQL 16 | Single small instance | dev |
| OpenAI API | OpenAI hosted models (SaaS) | External HTTPS API | Provider-managed | dev |
<!-- sdlc:auto:end environments -->

<!-- sdlc:auto:start live -->
_Not deployed yet._
<!-- sdlc:auto:end live -->

<!-- sdlc:auto:start topology -->
```mermaid
graph LR
  n_React_SPA["React SPA<br/>Static web app (S3 + CloudFront)"]
  n_FastAPI_Service["FastAPI Service<br/>Containerised backend (ECS Fargate or EC2)"]
  n_PostgreSQL["PostgreSQL<br/>Amazon RDS for PostgreSQL 16"]
  n_OpenAI_API["OpenAI API<br/>OpenAI hosted models (SaaS)"]
  n_React_SPA -->|HTTPS| n_FastAPI_Service
  n_FastAPI_Service -->|TLS/Postgres| n_PostgreSQL
  n_FastAPI_Service -->|HTTPS| n_OpenAI_API
```
<!-- sdlc:auto:end topology -->
