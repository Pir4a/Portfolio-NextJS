#!/usr/bin/env python3
"""
Script to add English translations to blogposts.json
This script transforms the current French-only structure into a bilingual structure
"""

import json
import sys

# English translations for certifications
CERTIFICATIONS_EN = {
    "histoire-saa": {
        "title": "AWS SAA: A Gateway to the Cloud",
        "excerpt": "Why I decided to learn Cloud computing and its challenges, my opinion and experience with the certification.",
        "content": """<h3 class='text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4'>Discovering the Cloud</h3><p>First, I became passionate (classic, I know, but real) about Cloud and DevOps when I wanted to learn more about ways to deploy my Fissure application.</p><p>I realized the real impact that a well-thought-out infrastructure and its implications could have, whether on costs, availability (High Availability), scalability, and security.</p><div class='my-8 h-px bg-slate-200 dark:bg-slate-700 w-full'></div><h3 class='text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4'>An Insufficient First Approach</h3><p>So I started learning Cloud by beginning with AWS, the market leader. After learning the basics of networking, scripting, and Linux, I wanted to take the <strong>Cloud Practitioner</strong> certification.</p><p>However, during my learning, I realized it was too superficial. I wanted to learn how to architect in detail, understand the possibilities and best choices for a specific need.</p><div class='my-8 h-px bg-slate-200 dark:bg-slate-700 w-full'></div><h3 class='text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4'>Choosing the Solutions Architect Associate</h3><p>So I started learning the <strong>AWS Solutions Architect Associate (SAA-C03)</strong> certification. It's an intermediate-level certification that validates cloud architect skills. I also thought it would have a positive impact on my profile and CV.</p><p>I started my learning and the verdict was clear: although theoretical, if you don't fall into exam dump cramming, you really learn Cloud and the services offered to deploy the most suitable infrastructure for a specific need.</p><p>Although dense and requiring remembering many details, studying this certification allowed me to understand the challenges and possibilities of Cloud and start thinking about solid infrastructure for my application.</p><div class='my-8 h-px bg-slate-200 dark:bg-slate-700 w-full'></div><h3 class='text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4'>The Exam and Result</h3><p>I obviously took the certification on January 2, 2026 and passed it on the first try! The test is quite stressful due to the anti-cheating pressure of the exam (I had to reschedule once because I was wearing headphones for sound...), but otherwise it went very well.</p><p>I can't yet say the real impact of the certification in the eyes of recruiters and on the market (even though it's somewhat considered the <em>gold standard</em> in the U.S. from a Cloud perspective). But in any case, the learning was more interesting to me than the badge itself. I'm therefore satisfied with this experience.</p><p class='mt-8 font-medium'>Thank you for your time and reading :)</p>"""
    },
    "terraform-cert": {
        "title": "Terraform Associate: Useless?",
        "excerpt": "Does the Terraform Associate certification really teach you to architect in code, or is it just cramming?",
        "content": """<h3 class='text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4'>The Certification Goal</h3><p>To deploy my application on AWS, I adopted an IaC (Infrastructure as Code) approach to version and code my infrastructure. Continuing my path toward DevOps and SRE, I thought taking the Terraform Associate certification would be an excellent step and a significant milestone to achieve.</p><div class='my-8 h-px bg-slate-200 dark:bg-slate-700 w-full'></div><h3 class='text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4'>Theory vs Practice: The Finding</h3><p>However, during my learning, a finding quickly emerged. After reading all the documentation and taking a first practice exam (with an honorable score of 65%), I realized in front of my IDE that I didn't know how to write a single line of Terraform [ without AI ;) ].</p><p>I perfectly understood theoretical concepts like <em>remote state</em> or <em>locking</em>, but I was unable to design the code architecture, organize modules, or define outputs.</p><div class='my-8 h-px bg-slate-200 dark:bg-slate-700 w-full'></div><h3 class='text-2xl font-bold text-violet-600 dark:text-violet-400 mb-4'>The Lesson to Remember</h3><p>I realized that the theory learned for the certification is useful, even essential: it teaches concepts that often remain hidden behind layers of abstraction if you just write code without understanding what happens behind the scenes.</p><p>But the reverse reflection is equally true: if you only focus on theory, you risk blank page syndrome when moving to practice.</p><p>In conclusion, this certification reminded me of an essential lesson: it's crucial to master your theoretical subject (documentation, concepts), but equally important to practice intensively (hands-on, labs). It's this combination that makes you truly effective, and I think this principle applies to many technologies and skills.</p><p class='mt-8 font-medium'>Thank you for reading! ;)</p>"""
    }
}

# English translations for journey sections
JOURNEY_SECTIONS_EN = {
    "Contexte et Objectifs": {
        "title": "Context and Objectives",
        "content": """<p>Fissure is a FullStack mobile application that allows tracking calories and workouts, all with a Gemini implementation to make data easier to track.</br> This may seem very classic, but as someone who practices sports personally and pays attention to my diet, I made an observation: there's no application that's correct from both a design and price perspective that allows doing both at once, often forcing two applications or even two subscriptions for a single goal.</p>"""
    },
    "Choix Technologiques": {
        "title": "Technology Choices",
        "content": """<p>After studying the different options, I opted for a clean architecture in ExpressJS, easy and quick to set up with good scalability.</p><p>For the app's front-end, to be able to deploy on iOS and Android with the same code and a technology I was already efficient in, I chose React Native with Expo.</p><p>For the database, PostgreSQL stood out as the obvious choice for its robustness, ACID compliance, and compatibility with the application's relational needs.</p>"""
    },
    "Le premier déploiement : une leçon d'humilité": {
        "title": "The First Deployment: A Lesson in Humility",
        "content": """<p>After obtaining a satisfactory MVP, I sought to quickly deploy the app for testing. With little background in networking and Cloud, needless to say my first deployment was catastrophic.</p><div class='my-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-r-lg'><p class='text-sm font-semibold text-red-800 dark:text-red-300 mb-2'>What I did (do not reproduce):</p><ul class='text-sm text-red-700 dark:text-red-400 space-y-1 list-disc list-inside'><li>Public EC2 instance exposed on the Internet</li><li>Security Group configured with ingress rules open on all ports (0.0.0.0/0)</li><li>Manual deployment via SSH and git clone</li><li>Database stored on the instance's EBS volume</li><li>No network separation, everything in the public subnet</li></ul></div><p class='mt-4'>This approach was a security and maintainability nightmare. This experience made me realize the complexity of deploying resilient, scalable, and secure infrastructure.</p>"""
    },
    "L'apprentissage et la remise en question": {
        "title": "Learning and Questioning",
        "content": """<p>Wanting to have control over the infrastructure rather than a completely serverless solution, I started seriously investigating Cloud and DevOps topics (you can check my post on the AWS SAA certification to learn more ;) ).</p><p>This questioning pushed me to study cloud architecture best practices, network security, and deployment patterns in depth.</p>"""
    },
    "L'architecture finale": {
        "title": "The Final Architecture",
        "content": """<p>After thoroughly studying Cloud, I opted for a modern and secure architecture. Here are the main components:</p><div class='my-6 grid grid-cols-1 md:grid-cols-2 gap-4'><div class='p-5 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl border border-violet-200 dark:border-violet-800'><h4 class='font-semibold text-violet-700 dark:text-violet-300 mb-3 flex items-center gap-2'><span class='text-lg'>🚀</span> Compute</h4><p class='text-sm text-slate-700 dark:text-slate-300 mb-2'><strong>ECS Fargate</strong> for serverless containerization</p><p class='text-xs text-slate-600 dark:text-slate-400'>Automatic deployments via ECR on push, automatic scaling</p></div><div class='p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800'><h4 class='font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2'><span class='text-lg'>💾</span> Database</h4><p class='text-sm text-slate-700 dark:text-slate-300 mb-2'><strong>RDS PostgreSQL</strong> Multi-AZ</p><p class='text-xs text-slate-600 dark:text-slate-400'>Automatic backups, ACID compliance, high availability</p></div><div class='p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800'><h4 class='font-semibold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2'><span class='text-lg'>🔒</span> Network Security</h4><p class='text-sm text-slate-700 dark:text-slate-300 mb-2'><strong>VPC with private subnets</strong></p><p class='text-xs text-slate-600 dark:text-slate-400'>ECS and RDS in private subnets, ALB in public, NAT Gateway for egress</p></div><div class='p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800'><h4 class='font-semibold text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2'><span class='text-lg'>🌐</span> Load Balancing</h4><p class='text-sm text-slate-700 dark:text-slate-300 mb-2'><strong>Application Load Balancer</strong></p><p class='text-xs text-slate-600 dark:text-slate-400'>Traffic distribution, health checks, SSL termination</p></div></div><p class='mt-6'>The infrastructure is deployed on <strong>2 Availability Zones</strong> to ensure automatic failover and high availability. An S3 bucket with image resizing via Lambda will arrive in the next version.</p><p class='mt-4 font-medium text-violet-600 dark:text-violet-400'>Layered Architecture:</p><div class='my-4 space-y-3'><div class='p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-violet-500'><p class='text-sm'><strong class='text-violet-600 dark:text-violet-400'>Presentation Layer</strong>: ALB distributing traffic</p></div><div class='p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-blue-500'><p class='text-sm'><strong class='text-blue-600 dark:text-blue-400'>Application Layer</strong>: ECS Fargate in private subnets</p></div><div class='p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-emerald-500'><p class='text-sm'><strong class='text-emerald-600 dark:text-emerald-400'>Data Layer</strong>: RDS PostgreSQL Multi-AZ</p></div><div class='p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-amber-500'><p class='text-sm'><strong class='text-amber-600 dark:text-amber-400'>Cache Layer</strong>: ElastiCache Redis (coming soon)</p></div><div class='p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-purple-500'><p class='text-sm'><strong class='text-purple-600 dark:text-purple-400'>Monitoring Layer</strong>: CloudWatch for logs and metrics</p></div></div>""",
        "diagram": {
            "type": "image",
            "imagePath": "/static/fissure.png",
            "description": "Cloud architecture diagram"
        }
    },
    "Infrastructure as Code": {
        "title": "Infrastructure as Code",
        "content": """<p>To manage infrastructure in a reproducible way, I used Terraform. This allowed me to:</p><ul class='list-disc list-inside space-y-2 my-4'><li>Version all infrastructure</li><li>Facilitate deployments and rollbacks</li><li>Document architecture in code</li><li>Share and collaborate easily</li></ul><p class='mt-4'>The Terraform module structure follows best practices with clear separation between environments (dev, staging, prod).</p>""",
        "diagram": {
            "type": "terraform",
            "description": "Modular Terraform structure"
        }
    },
    "Sécurité et Conformité": {
        "title": "Security and Compliance",
        "content": """<p>Security was an absolute priority. I implemented:</p><div class='my-6 space-y-3'><div class='flex items-start gap-3'><span class='text-violet-600 dark:text-violet-400 font-semibold'>•</span><div><strong>IAM Roles</strong>: Principle of least privilege for all services</div></div><div class='flex items-start gap-3'><span class='text-violet-600 dark:text-violet-400 font-semibold'>•</span><div><strong>Secrets Manager</strong>: Secure credential management</div></div><div class='flex items-start gap-3'><span class='text-violet-600 dark:text-violet-400 font-semibold'>•</span><div><strong>WAF</strong>: Protection against common web attacks</div></div><div class='flex items-start gap-3'><span class='text-violet-600 dark:text-violet-400 font-semibold'>•</span><div><strong>Encryption</strong>: Encryption at rest and in transit</div></div></div>"""
    },
    "Monitoring et Observabilité": {
        "title": "Monitoring and Observability",
        "content": """<p>To ensure system reliability, I set up comprehensive monitoring:</p><p class='my-4'><strong>CloudWatch</strong> for system and application metrics, <strong>X-Ray</strong> for distributed tracing, and <strong>CloudWatch Logs</strong> for centralized log aggregation.</p><p>Alerts were configured for critical metrics (CPU, memory, latency, errors) with thresholds adapted to each environment.</p>""",
        "diagram": {
            "type": "monitoring",
            "description": "Monitoring dashboard with key metrics"
        }
    },
    "Optimisation des Coûts": {
        "title": "Cost Optimization",
        "content": """<p>Cost optimization was crucial for a personal project. Comparing my first deployment (always-on EC2) to the final architecture, I achieved huge savings.</p><div class='my-6 grid grid-cols-1 md:grid-cols-2 gap-4'><div class='p-5 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800'><h4 class='font-semibold text-red-700 dark:text-red-300 mb-3 flex items-center gap-2'><span class='text-lg'>❌</span> Before (EC2)</h4><ul class='text-sm text-slate-700 dark:text-slate-300 space-y-2'><li>t3.medium instance 24/7</li><li>~$30/month fixed</li><li>No scaling</li><li>Costs even without traffic</li></ul></div><div class='p-5 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800'><h4 class='font-semibold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2'><span class='text-lg'>✅</span> After (Fargate)</h4><ul class='text-sm text-slate-700 dark:text-slate-300 space-y-2'><li>ECS Fargate with scaling</li><li>~$8-15/month variable</li><li>Scale-to-zero possible</li><li>Real pay-per-use</li></ul></div></div><p class='mt-6 font-medium text-violet-600 dark:text-violet-400'>Optimization strategies implemented:</p><div class='my-4 space-y-3'><div class='p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg border-l-4 border-violet-500'><p class='text-sm'><strong class='text-violet-600 dark:text-violet-400'>Smart auto-scaling</strong>: ECS Fargate automatically scales based on CPU/memory load, allowing reduction to zero during off-peak periods</p></div><div class='p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-l-4 border-blue-500'><p class='text-sm'><strong class='text-blue-600 dark:text-blue-400'>Optimized RDS Multi-AZ</strong>: Using db.t3.micro in dev, db.t3.small in prod with automatic snapshots to reduce costs</p></div><div class='p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border-l-4 border-amber-500'><p class='text-sm'><strong class='text-amber-600 dark:text-amber-400'>S3 lifecycle policies</strong>: Automatic transition to Glacier for old assets, 70% reduction on storage</p></div><div class='p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg border-l-4 border-emerald-500'><p class='text-sm'><strong class='text-emerald-600 dark:text-emerald-400'>Cost monitoring</strong>: AWS Cost Explorer with budget alerts to avoid surprises</p></div></div><div class='mt-6 p-5 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl border-2 border-violet-300 dark:border-violet-700'><p class='text-center'><span class='text-2xl font-bold text-violet-700 dark:text-violet-300'>~60% reduction</span><span class='text-sm text-slate-600 dark:text-slate-400 block mt-1'>in costs compared to the initial EC2 architecture</span></p></div>"""
    },
    "Leçons Apprises": {
        "title": "Lessons Learned",
        "content": """<p>This project taught me a lot about cloud architecture and DevOps. Here are the lessons I learned from this adventure, from the first catastrophic deployment to the final architecture:</p><div class='my-6 space-y-4'><div class='p-5 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl border-l-4 border-violet-500'><h4 class='font-semibold text-violet-700 dark:text-violet-300 mb-3 flex items-center gap-2'><span class='text-lg'>🎯</span> Start simple, iterate later</h4><p class='text-sm text-slate-700 dark:text-slate-300'>My first EC2 deployment was a mistake, but it allowed me to quickly understand the challenges. Rather than over-architecting from the start, I learned to iterate: MVP → learning → improvement. This approach led me to the final architecture.</p></div><div class='p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-l-4 border-blue-500'><h4 class='font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2'><span class='text-lg'>📚</span> Theory without practice isn't enough</h4><p class='text-sm text-slate-700 dark:text-slate-300'>Passing the AWS SAA certification gave me theoretical foundations, but it was by actually deploying that I understood the real challenges. As with Terraform, theory is essential but practice reveals the details hidden behind abstractions.</p></div><div class='p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border-l-4 border-emerald-500'><h4 class='font-semibold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2'><span class='text-lg'>🔒</span> Security from the start, not after</h4><p class='text-sm text-slate-700 dark:text-slate-300'>Configuring a Security Group open on all ports was a monumental mistake. I learned that security must be thought of from the design: private subnets, IAM roles, encryption. It's much harder to add afterward.</p></div><div class='p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-l-4 border-amber-500'><h4 class='font-semibold text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2'><span class='text-lg'>🤖</span> Automation is non-negotiable</h4><p class='text-sm text-slate-700 dark:text-slate-300'>Deploying manually via SSH was a nightmare. Terraform and automatic deployments via ECR transformed my workflow. Automation reduces human errors and makes rollbacks possible in minutes.</p></div><div class='p-5 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl border-l-4 border-pink-500'><h4 class='font-semibold text-pink-700 dark:text-pink-300 mb-3 flex items-center gap-2'><span class='text-lg'>💰</span> Cloud costs can explode quickly</h4><p class='text-sm text-slate-700 dark:text-slate-300'>An always-on EC2 instance costs a lot even without traffic. I learned to monitor costs from the start with Cost Explorer and use scaling to pay only for what I actually use.</p></div><div class='p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border-l-4 border-indigo-500'><h4 class='font-semibold text-indigo-700 dark:text-indigo-300 mb-3 flex items-center gap-2'><span class='text-lg'>📝</span> Document as you go</h4><p class='text-sm text-slate-700 dark:text-slate-300'>Terraform as living documentation, code comments, and this blog post. Documentation helps me understand my own past decisions and share my learnings.</p></div></div><div class='mt-6 p-5 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl border-2 border-violet-300 dark:border-violet-700'><p class='text-center text-slate-700 dark:text-slate-300'><span class='font-semibold'>This infrastructure continuously evolves</span> with application needs and newly acquired knowledge. Every mistake is a learning opportunity, and every improvement makes the system more robust.</p></div>"""
    }
}

def transform_blogposts(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Transform certifications
    transformed_certifications = []
    for cert in data.get('certifications', []):
        cert_id = cert.get('id')
        en_data = CERTIFICATIONS_EN.get(cert_id, {})
        
        transformed_cert = {
            'id': cert_id,
            'fr': {
                'title': cert.get('title', ''),
                'excerpt': cert.get('excerpt', ''),
                'content': cert.get('content', '')
            },
            'en': {
                'title': en_data.get('title', cert.get('title', '')),
                'excerpt': en_data.get('excerpt', cert.get('excerpt', '')),
                'content': en_data.get('content', cert.get('content', ''))
            },
            'date': cert.get('date', ''),
            'category': cert.get('category', ''),
            'readTime': cert.get('readTime', ''),
            'icon': cert.get('icon', '')
        }
        transformed_certifications.append(transformed_cert)
    
    # Transform journeys
    transformed_journeys = []
    for journey in data.get('journeys', []):
        journey_id = journey.get('id')
        
        # Transform sections
        transformed_sections = []
        for section in journey.get('sections', []):
            section_title_fr = section.get('title', '')
            en_section = JOURNEY_SECTIONS_EN.get(section_title_fr, {})
            
            transformed_section = {
                'fr': {
                    'title': section_title_fr,
                    'content': section.get('content', '')
                },
                'en': {
                    'title': en_section.get('title', section_title_fr),
                    'content': en_section.get('content', section.get('content', ''))
                }
            }
            
            # Handle diagram if present
            if 'diagram' in section:
                diagram = section['diagram']
                if section_title_fr in JOURNEY_SECTIONS_EN and 'diagram' in JOURNEY_SECTIONS_EN[section_title_fr]:
                    transformed_section['diagram'] = JOURNEY_SECTIONS_EN[section_title_fr]['diagram']
                else:
                    transformed_section['diagram'] = diagram
            
            transformed_sections.append(transformed_section)
        
        # Journey metadata
        journey_title_fr = journey.get('title', '')
        journey_excerpt_fr = journey.get('excerpt', '')
        
        transformed_journey = {
            'id': journey_id,
            'fr': {
                'title': journey_title_fr,
                'excerpt': journey_excerpt_fr
            },
            'en': {
                'title': 'Fissure: From Catastrophic Deployment to Modern Cloud Architecture',
                'excerpt': 'The complete story of designing and deploying the cloud infrastructure for my Fissure application, from the first idea to production.'
            },
            'date': journey.get('date', ''),
            'category': journey.get('category', ''),
            'readTime': journey.get('readTime', ''),
            'sections': transformed_sections
        }
        transformed_journeys.append(transformed_journey)
    
    # Create new structure
    new_data = {
        'certifications': transformed_certifications,
        'journeys': transformed_journeys
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, ensure_ascii=False, indent=4)
    
    print(f"✅ Successfully transformed {input_file} -> {output_file}")
    print(f"   - {len(transformed_certifications)} certifications")
    print(f"   - {len(transformed_journeys)} journeys")

if __name__ == '__main__':
    input_file = '/Users/utilisateur/Ecole/Portfolio-NextJS/datas/blogposts.json'
    output_file = '/Users/utilisateur/Ecole/Portfolio-NextJS/datas/blogposts.json'
    transform_blogposts(input_file, output_file)
