# Fissure Infrastructure Diagram

```mermaid
graph TD
    User[📱 Mobile App / User] -->|HTTPS/443| IGW[Internet Gateway]
    
    subgraph AWS_Cloud[AWS Cloud (eu-west-1)]
        IGW --> ALB[⚖️ Application Load Balancer]
        
        subgraph VPC[VPC]
            
            subgraph Public_Subnets[Public Subnets]
                ALB
                NAT[NAT Gateway]
            end
            
            ALB -->|HTTP/80| ECS_Service[⚙️ ECS Service]
            
            subgraph Private_Subnets[Private Subnets]
                ECS_Service
                RDS[(🗄️ RDS PostgreSQL)]
            end
            
            ECS_Service -->|TCP/5432| RDS
            ECS_Service -->|Outbound| NAT
        end
        
        NAT --> IGW
        
        ECR[📦 ECR Repository] -.->|Pull Image| ECS_Service
        CW[📊 CloudWatch Logs] -.->|Logs| ECS_Service
    end

    classDef aws fill:#FF9900,stroke:#232F3E,color:white;
    classDef vpc fill:#E6F2F8,stroke:#232F3E,stroke-dasharray: 5 5;
    classDef subnet fill:#ffffff,stroke:#232F3E;
    
    class AWS_Cloud aws;
    class VPC vpc;
    class Public_Subnets,Private_Subnets subnet;
```

## Diagram Key
- **User**: The entry point, connecting via secure HTTPS.
- **ALB**: Handles SSL termination and distributes traffic.
- **ECS Fargate**: Runs the backend application containers in private subnets for security.
- **RDS**: Managed PostgreSQL database, isolated in private subnets.
- **NAT Gateway**: Allows private resources to access the internet (e.g., for updates) without exposing them.
