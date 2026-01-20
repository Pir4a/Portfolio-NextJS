# Architecture & Design Decisions

## 🏗️ Infrastructure Architecture

### 1. Compute Provider: ECS Fargate
**Decision**: Use **AWS ECS Fargate** instead of EC2 or Lambda.
- **Why**: 
    - **Serverless Containers**: No need to manage/patch underlying instances (unlike EC2).
    - **Predictable Performance**: Better for long-running backend services compared to Lambda's cold starts and execution time limits.
    - **Scalability**: Native integration with AWS Auto Scaling.

### 2. Database: Amazon RDS (PostgreSQL)
**Decision**: Use **Managed RDS PostgreSQL**.
- **Why**:
    - **Relational Data**: The domain application deals with structured, related data (Users, Workouts, Food Logs) which fits the relational model better than NoSQL (DynamoDB).
    - **Management**: AWS handles backups, patching, and failover.
    - **Performance**: Validated performance for typical CRUD workloads.

### 3. Network Security Strategy
**Decision**: **VPC with Strictly Segregated Subnets**.
- **Architecture**:
    - **Public Subnets**: Host only the Load Balancer (ALB) and NAT Gateway.
    - **Private Subnets**: Host the Application Logic (ECS) and Database (RDS).
- **Benefit**: "Defense in Depth". Even if the application is compromised, the database is not directly addressable from the public internet. Access is strictly controlled via Security Groups (ALB -> ECS -> RDS).

### 4. Infrastructure as Code (IaC)
**Decision**: **Terraform**.
- **Why**:
    - **Reproducibility**: Entire environment can be spun up/torn down with one command.
    - **Modularity**: Code is organized into reusable modules (`networking`, `compute`, `database`, `storage`).
    - **Version Control**: Infrastructure changes are tracked closely with code changes.

---

## 🧠 Backend Software Architecture

### Core Pattern: Clean Architecture (Hexagonal)
The backend follows **Clean Architecture** principles to separate business logic from technical details.

#### Layer Breakdown:

1.  **Domain Layer** (`src/domain/`)
    -   **Entities**: Pure TypeScript classes representing core business objects (e.g., `User`, `Workout`).
    -   **Repositories (Interfaces)**: Defines *how* data should be accessed, but not *implementation details*.
    -   **Dependency Rule**: This layer knows NOTHING about the database, HTTP frameworks, or external APIs.

2.  **Use Cases / Application Layer** (Implicit in Services)
    -   Contains application-specific business rules.
    -   Orchestrates the flow of data to and from domain entities.

3.  **Interface Adapters** (`src/interface/`)
    -   **Controllers**: Converts HTTP requests into calls to internal use cases.
    -   **Presenters/DTOs**: Formats data for the response.

4.  **Infrastructure Layer** (`src/infrastructure/`)
    -   **Database**: Implementation of Repositories (e.g., Drizzle ORM implementation).
    -   **External Services**: Implementations of 3rd party API clients.

### Key Benefits of this Approach:
-   **Testability**: Business logic can be unit tested without spinning up a database.
-   **Flexibility**: We can swap the database (e.g., Postgres to Mongo) or framework (Express to Fastify) without touching the core business logic.
-   **Maintainability**: Clear separation of concerns makes the codebase easier to navigate and debug.
