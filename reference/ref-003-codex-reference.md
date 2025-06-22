# **Codex – OpenAI API Reference**

  

## **Page 1**

  

**Codex**

Delegate tasks to a software engineering agent in the cloud.

  

**Connect your GitHub**

To grant the Codex agent access to your GitHub repos, install our GitHub app to your organization. The two permissions required are:

- Ability to clone the repo
    
- Ability to push a pull request to it
    
    Our app will not write to your repo without your permission.
    

---

## **Page 2**

  

Each user in your organization must authenticate with their GitHub account before being able to use Codex. After auth, we grant access to your GitHub repos and environments at the ChatGPT workspace level—meaning if your teammate grants access to a repo, you’ll also be able to run Codex tasks in that repo, as long as you share a workspace.

  

**How it works**

1. You navigate to chatgpt.com/codex and submit a task.
    
2. A new container is launched using our base image. Your repo is cloned at the desired branch or SHA, and setup scripts run from the specified workdir.
    
3. Internet access is configured (off by default, can be limited or full).
    
4. The agent runs terminal commands in a loop: writes code, runs tests, and attempts to check its work.
    
5. When the task is complete, Codex presents a diff or follow-up tasks. You can open a PR or respond with additional comments.
    

---

## **Page 3**

  

**Submit tasks to Codex**

Modes:

- Ask mode: brainstorming, audits, architecture questions
    
- Code mode: automated refactors, tests, or fixes applied
    

  

**Ask mode examples**

1. Refactoring suggestions: structure, split files, tighten docs.
    
2. Q&A and architecture: answer deep codebase questions, generate diagrams.
    

  

**Code mode examples**

1. Security audits
    
2. Code review using .diff links
    
3. Test generation
    
4. Bug fixing
    

---

## **Page 4**

  

**UI and Product Fixes**

Codex can fix minor UI regressions even though it doesn’t render a browser.

  

**Environment Configuration**

Use the default codex-universal container image or customize with:

- Setup scripts (e.g., install dependencies like linters, Pyright, pnpm)
    
- Environment variables
    
- Encrypted secrets (only available during setup phase)
    

---

## **Page 5**

  

**Setup Script Example**

```
# Install type checker
pip install pyright

# Install dependencies
poetry install --with test
pnpm install
```

Note: Environment variables in setup scripts don’t persist to agent tasks unless added to ~/.bashrc.

  

**Internet and Proxy Settings**

- Internet: off by default for agent phase
    
- Proxy configured by default; respects http_proxy, https_proxy, PIP_CERT, etc.
    

---

## **Page 6**

  

**Using AGENTS.md**

AGENTS.md provides common repo context:

- Which folders/files to work in
    
- Style/contribution guides
    
- How to validate changes (tests, linting)
    
- Where and how to write docs, format PRs
    

  

**Example Structure**

```
# Contributor Guide

## Dev Environment Tips
- Use pnpm dlx turbo run ...
- Run pnpm install --filter ...

## Testing Instructions
- Run pnpm test or use CI workflows
- Fix errors, add/update tests, lint
```

---

## **Page 7**

  

**Prompting Tips**

- Use file names, stack traces, identifiers to narrow scope
    
- Include verification steps (tests, repro steps)
    
- Customize Codex behavior (specific commits, PR templates, skip tools)
    
- Split large tasks into smaller pieces
    
- Use Codex for debugging with logs and traces
    
- Try open-ended prompts: clean up code, brainstorm, generate docs
    

---

## **Page 8**

  

**Security & MFA Requirements**

- Codex requires higher account security
    

  

**If using Social Logins (Google, MS, Apple):**

MFA not required by ChatGPT, but strongly recommended.

  

**If using SSO:**

Org admin should enforce MFA

  

**If using Email/Password:**

MFA is mandatory before Codex access

  

**Multiple Login Methods:**

If one method is email/password, MFA is required no matter how you log in.