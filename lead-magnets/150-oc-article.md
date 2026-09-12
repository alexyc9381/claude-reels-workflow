<!-- Published at https://chen.media/guides/claude-octopus-setup-guide; canonical site source is alexyc9381/chenmedialabs commit fbaa42d. -->

# Claude Octopus Setup Guide

Use independent AI opinions to challenge a plan and review the work before you ship

Claude Octopus brings additional model perspectives into a Claude Code workflow. This guide walks you through installing it, checking which providers are available, and giving the council a concrete decision to challenge. Then you can use focused prompts for a build, a code review and a security pass.

The useful part of AI disagreement is the evidence it produces: a missed requirement, a failing test or a design tradeoff you can act on. More opinions alone do not establish a tenfold improvement. Judge the result against the same acceptance criteria you would use for any other implementation.

## Install and check the setup

Start with a working Claude Code installation. Octopus is an independent MIT licensed project. The plugin can start with Claude alone; an independent provider must be configured before you can expect a cross-provider comparison. API usage or subscription limits still apply.

Run these two commands in your terminal, outside an active Claude Code session:

```text
claude plugin marketplace add https://github.com/nyldn/plugins.git
claude plugin install octo@nyldn-plugins
```

Open Claude Code in a small project you know well. Run the setup command inside that session and follow its provider configuration steps:

```text
/octo:setup
```

Octopus stays dormant until you invoke an /octo:* command. If you only ask an ordinary Claude question after installation, that does not demonstrate that multiple providers contributed. Confirm the available providers before your first council run.

## Make the council decide something specific

Start with a decision that has two plausible answers. A small architecture choice is easier to evaluate than asking a panel to improve your entire application. Replace the bracketed details below with the actual context of your project.

```text
/octo:council --goal decision --domain architecture --style adversarial --depth quick --implement never --max-cost 1 "For [project], compare [option A] with [option B]. Constraints: [traffic, team size, deadline and budget]. Inspect the relevant code. Identify the strongest failure case for each option. Return a recommendation, evidence, unresolved disagreements and one small experiment that could change the decision. Do not edit files."
```

The council command supports decision goals, adversarial styles, explicit implementation controls and a cost cap. Treat a provider or budget gate as information about what could run. If the panel cannot meet its requirements, resolve that limitation before describing its output as a completed multi-model review.

Look for a concrete disagreement. For example, one reviewer might favor a background queue while another finds that an existing transaction already handles the failure case. The follow-up should test that specific assumption. A longer discussion is not the acceptance criterion.

## Turn the decision into a bounded build

Once you choose an approach, keep the build small enough to inspect. The full lifecycle command covers discovery, definition, development and delivery. This example gives it a feature, observable completion criteria and clear limits:

```text
/octo:embrace "Build [one feature] in this repository using the chosen approach [decision]. Done means: [three observable outcomes]. Reuse existing project conventions. First state the plan and acceptance checks, then implement and run the relevant tests. Report the changed files, actual test results and remaining issues. Do not deploy, merge or alter unrelated features."
```

Keep the acceptance criteria after the run. They are the reference for the review, so a polished explanation cannot silently replace a missing behavior.

## Review the implementation against the promise

Use the enhanced review when an independent model perspective could help. Its provider availability report tells you what is configured. Ask for findings tied to actual code and observable consequences, rather than a list of general best practices.

```text
/octo:review "Review the working-tree changes for [feature] against these acceptance criteria: [criteria]. Focus on correctness, edge cases and unnecessary complexity. For every finding, provide the file and line, a concrete failure scenario, severity and a minimal fix. Separate confirmed issues from hypotheses. Report which providers actually contributed. Do not edit files or publish PR comments."
```

Read the findings before asking for fixes. A claim that names a file but offers no reproducible failure may still be a hypothesis. Take the most important confirmed issue, reproduce it, make the smallest correction and repeat the relevant test. Record anything you decide not to change and why.

## Give the security pass a real boundary

A useful security request names the trust boundary: who can submit input, what privileges the service has, and what data must stay protected. The security command can perform a project audit. Keep the first pass focused on your local code and request evidence for each finding.

```text
/octo:security "Audit the local [authentication or upload or payment] code in this repository. Trace untrusted input to sensitive actions and check authorization across user boundaries. Return each finding with file and line, exploit preconditions, impact, evidence and a minimal remediation. Distinguish confirmed issues from items needing manual validation. Do not edit files, probe external systems or publish findings."
```

The smashing shield in the video represents this challenge step. A clean AI report is not proof that a system is secure. For a reported authorization flaw, for example, add a regression check showing that one user cannot access another user's resource, then rerun it after the fix.

## Read the outcome before running a bigger job

Ask three practical questions when the run finishes. Did the intended providers actually contribute? Did the output identify an issue you could verify? Did the final implementation pass the checks you specified before the debate? Keep those answers with the change.

Agreement between reviewers is useful context, but it is weaker evidence than a passing regression test for the failure they identified. If they disagree, preserve the disagreement and test the deciding assumption. Do not average two incompatible recommendations into a vague compromise.

## When the workflow does not start

- No independent provider is available: return to /octo:setup and configure a provider you can access, then check readiness again.

- The command is missing after installation: restart the Claude Code session and confirm that the octo plugin is enabled in the plugin manager.

- Ordinary prompts use only Claude: invoke the intended /octo:* command explicitly.

- The council hits its budget or provider limits: narrow the question and reduce the context before increasing the budget.

- The output is too generic: provide the actual acceptance criteria and a specific file, change or architecture decision to inspect.

## Your first useful run

Pick one change you already understand. Run the council on its main design choice, implement the bounded version, and review the resulting diff. Keep one before-and-after example: the original assumption, the finding that challenged it, the change you made and the test that established the result. That is a useful reason to repeat the workflow.

## Official project references

Installation and provider setup: https://github.com/nyldn/claude-octopus#quickstart

Council flags: https://github.com/nyldn/claude-octopus/blob/main/commands/council.md

Review workflow: https://github.com/nyldn/claude-octopus/blob/main/commands/review.md

Security workflow: https://github.com/nyldn/claude-octopus/blob/main/commands/security.md

Engineering methods: https://github.com/nyldn/claude-octopus/blob/main/docs/WORKFLOW-METHODS.md
