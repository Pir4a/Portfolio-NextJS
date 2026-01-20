"use client"

import {
  FaReact,
  FaDocker
} from "react-icons/fa"
import { RiNextjsFill, RiTailwindCssLine } from "react-icons/ri"
import { SiTypescript, SiTerraform, SiAnsible, SiKubernetes, SiGrafana, SiPrometheus } from "react-icons/si"

const toolset = [
  {
    category: "Infrastructure & Cloud", items: [
      { Icon: FaDocker, label: "Docker" },
      { Icon: SiKubernetes, label: "Kubernetes" },
      { Icon: SiTerraform, label: "Terraform" },
      { Icon: SiAnsible, label: "Ansible" }
    ]
  },
  {
    category: "Observability", items: [
      { Icon: SiGrafana, label: "Grafana" },
      { Icon: SiPrometheus, label: "Prometheus" }
    ]
  },
  {
    category: "Frontend Ecosystem", items: [
      { Icon: RiNextjsFill, label: "Next.js" },
      { Icon: SiTypescript, label: "TypeScript" },
      { Icon: RiTailwindCssLine, label: "Tailwind" },
      { Icon: FaReact, label: "React" }
    ]
  },
]

export default function Competences() {

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 border-l border-gray-200 dark:border-gray-800 ml-4 lg:ml-20 pl-8 lg:pl-12">
      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-black dark:text-white mb-2">
          Technical Arsenal
        </h2>
        <p className="font-mono text-sm text-gray-500">
          $ echo $PATH
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {toolset.map((group) => (
          <div key={group.category}>
            <h3 className="text-xl font-bold font-mono mb-6 border-b border-gray-200 dark:border-gray-800 pb-2 inline-block">
              {group.category}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {group.items.map((tool) => (
                <div key={tool.label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 hover:border-blue-500 transition-colors">
                  <tool.Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  <span className="font-mono text-sm">{tool.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
