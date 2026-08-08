# JobGist

**A Thai-language job platform for workers without resumes, powered by cost-efficient Thai LLM profile generation and summarization.**

JobGist is a two-sided job-matching platform serving a segment of the Thai labor market that existing job sites ignore: basic-skill workers (factory, warehouse, service roles) who cannot write a resume, and small Thai businesses with no HR function. Instead of requiring a resume, workers complete a guided Thai form and an LLM generates a job-ready profile on their behalf. Employers post jobs in plain Thai and receive AI-generated applicant summaries with fit scores.

This repository contains both the **application** (worker-facing and employer-facing product) and the **research pipeline** (cost-optimized Thai LLM routing and evaluation), which together form an academic contribution as well as a working MVP.

---

## Table of Contents

- [Motivation](#motivation)
- [Core Concept](#core-concept)
- [Research Contribution](#research-contribution)
- [Feature Set](#feature-set)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [References](#references)

---

## Motivation

- **The articulation gap.** Many workers know what they can do but cannot express it in a formal document. Every mainstream job platform assumes a resume or self-written profile as the entry ticket, excluding this group at the first step.
- **No channel for small Thai employers.** Most Thai SMEs have no HR department. Hiring for operational roles still relies on word of mouth or posted signs.
- **Thai is expensive for LLMs.** Thai text consumes several times more tokens than English under mainstream tokenizers. A platform generating and summarizing Thai profiles at prices affordable to SMEs must treat cost as a first-class design constraint — this is the research core of the project.

## Core Concept

- **Workers** never write a resume. They complete a simple guided Thai form (with voice input support) covering work experience, skills, and certificates (attached as photo evidence). An LLM generates a job-ready Thai profile automatically, which the worker verifies before publishing.
- **Employers** post jobs in plain Thai. For each applicant, they receive an AI-generated Thai summary with a fit score and a plain-language rationale — no HR expertise required.

## Research Contribution

The model routing and evaluation pipeline is a core scholarly contribution, not just a technical detail:

- **Model routing:** dynamically route between **Typhoon 2** (Thai-optimized, token-efficient) and **GPT-4o-mini** (general-purpose commercial) based on task complexity.
- **Evaluation pipeline:** track **ROUGE** and **BERTScore** to measure quality trade-offs between routing choices.
- **User-correction feedback loop:** capture worker/employer corrections to generated text as a signal for improving routing and prompting over time.
- **Contribution:** the first systematic, cost-aware comparison of a Thai-optimized open model against a general-purpose commercial model on Thai profile generation and summarization, reporting quality, token efficiency, and latency.

> **Design principle:** the cost-optimization and evaluation modules should be architected into the codebase from the start, even if not fully implemented in the MVP — retrofitting them later would be costly, and they represent the project's primary research contribution.

## Feature Set

### Worker-side
- Guided multi-step form with voice input
- Photo/OCR-based document and certificate upload
- AI-generated profile preview with human verification step
- Map-based job search with icon-driven filters

### Employer-side
- Natural language job posting
- AI-generated applicant summaries with fit scores
- Simplified dashboard designed for owners with no HR background

### Backend / Research Core
- Model routing layer (Typhoon 2 vs. GPT-4o-mini, chosen by task complexity)
- Evaluation pipeline tracking ROUGE and BERTScore
- User-correction feedback loop for continuous improvement


## References

1. "'I Know I Can Do the Job, It's Just Putting It Down': Using Personas as a Mirror to Identify Strengths," Proc. ACM CHI, 2026.
2. J. Mu et al., arXiv:2411.14252, 2024.
3. Z. Csaki et al., "Efficiently Adapting Pretrained Language Models to New Languages," arXiv:2311.05741, 2023.
4. A. Petrov et al., "Language Model Tokenizers Introduce Unfairness Between Languages," NeurIPS, 2023; O. Ahia et al., EMNLP, 2023.
5. Platform survey: JobThai, jobsDB Thailand, JOBBKK, JobTH, JobTopGun (Super Resume), accessed July 2026.
6. Daywork, AI-assisted gig staffing platform, Thailand.
7. Veroskills, AI blue-collar staffing platform with resume creation, RecTech Media coverage, Dec. 2025.
8. CloudApper AI Recruiter, chatbot/SMS-based frontline hiring, 2025.
9. I. Medhi Thies et al., Microsoft Research India, job boards and digital tools for low-literate users (2006–2018).
10. C. Gan et al., "Application of LLM Agents in Recruitment," arXiv:2401.08315, 2024.
11. K. Pipatanakul et al., "Typhoon 2: A Family of Open Text and Multimodal Thai Large Language Models," arXiv:2412.13702, 2024.

---

*JobGist combines a product build with an academic research contribution on cost-efficient Thai-language LLM usage. Contributions and issues should keep both goals in mind: shippable MVP features, and a clean, extensible research pipeline.*
