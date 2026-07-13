# Architecture Decision Records

Architecture Decision Records (ADRs) capture decisions that have meaningful,
long-term consequences. They explain the context and trade-offs so future
contributors do not have to reconstruct the reasoning from code.

## When to create an ADR

Create one when deciding matters such as:

- the application stack;
- the student-code isolation model;
- lesson content format and versioning;
- state ownership boundaries;
- persistence and account strategy;
- deployment architecture.

Do not create an ADR for routine implementation details that are obvious from the
code and easy to change.

## Naming

Use a sequential number and short description:

```text
0001-select-initial-application-stack.md
0002-isolate-student-code-with-sandboxed-frames.md
```

## Template

```markdown
# ADR NNNN: Decision title

- Status: proposed | accepted | superseded
- Date: YYYY-MM-DD

## Context

What problem or constraint requires a decision?

## Decision

What will we do?

## Alternatives considered

What realistic alternatives were evaluated?

## Consequences

What becomes easier, harder, or constrained because of this decision?
```
