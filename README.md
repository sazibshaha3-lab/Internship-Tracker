# Internship Tracker -- A Web-Based Internship Management System

A university Software Engineering project focused on designing a
user-friendly platform to organize internship discovery, applications,
interviews, and career support.

> **Project status:** UI/UX prototype and system-analysis project. The
> current scope is primarily interface design and UML documentation; a
> working backend, database integration, and production deployment are
> not claimed.

## Table of Contents

-   [Overview](#overview)
-   [Problem Statement](#problem-statement)
-   [Objectives](#objectives)
-   [Target Users](#target-users)
-   [Main Features](#main-features)
-   [Student Workflow](#student-workflow)
-   [UML and System Design](#uml-and-system-design)
-   [Technology and Tools](#technology-and-tools)
-   [Project Scope](#project-scope)
-   [Novelty and Expected Benefits](#novelty-and-expected-benefits)
-   [Limitations](#limitations)
-   [Future Improvements](#future-improvements)
-   [Repository Structure](#repository-structure)

## Overview

Internship Tracker is designed to bring internship-related activities
into one organized platform. Students can explore opportunities, apply
for internships, upload resumes, follow application progress, and check
interview schedules. Recruiters can publish internship listings and
manage candidates, while Career Advisors can support students and Admins
can oversee the platform.

The project emphasizes clear role-based workflows, understandable
navigation, and a consistent user experience.

## Problem Statement

Students often manage internship opportunities, resumes, application
updates, interview schedules, and follow-up tasks across different
websites, emails, and personal notes. This scattered process can make it
difficult to track progress and remember deadlines. Internship Tracker
proposes a centralized interface to make these activities easier to
organize and monitor.

## Objectives

-   Design a clear and user-friendly internship management interface.
-   Organize the internship application lifecycle in one place.
-   Separate responsibilities for Students, Recruiters, Career Advisors,
    and Admins.
-   Help students discover internships that align with their skills.
-   Represent application deadlines, interview dates, and company
    follow-ups through reminders.
-   Document the proposed system with UML diagrams.

## Target Users

### 1. Student

Explores internships, manages their own applications and resumes, tracks
application status, views interview schedules, and uses student-focused
tools.

### 2. Recruiter

Posts and manages internship listings, reviews applications and
candidate resumes, updates application statuses, schedules interviews,
and records interview feedback.

### 3. Career Advisor

Reviews student profiles and resumes, provides feedback, monitors
internship progress, schedules career sessions, and views career
analytics.

### 4. Admin

Manages users, companies, internship listings, applications, recruiter
approvals, reports, and system settings.

## Main Features

### Student Features

-   Register and log in.
-   View dashboard and update profile.
-   Browse and search internship listings.
-   View internship details.
-   Apply for an internship.
-   Upload and manage resumes.
-   Save internships for later.
-   Track application status.
-   View interview schedules.
-   Add personal notes related to applications.
-   **Skill-Based Internship Matching:** show internships that may fit a
    student's skills, a match percentage, and missing skills.
-   **Smart Deadline & Follow-up Reminders:** help students keep track
    of application deadlines, interview dates, and follow-ups with
    companies.
-   View notifications.

### Recruiter Features

-   Register and log in, subject to the proposed approval process.
-   Manage recruiter profile.
-   Post and manage internship listings.
-   View applications for posted internships.
-   View candidate resumes.
-   Update application statuses.
-   Schedule interviews.
-   Add interview feedback.
-   View notifications.

### Career Advisor Features

-   View student profiles.
-   Review resumes.
-   Add feedback.
-   View student internship progress.
-   Schedule career sessions.
-   Approve resumes where applicable in the proposed workflow.
-   View career analytics.

### Admin Features

-   Manage users.
-   Manage companies.
-   Manage internship listings.
-   Manage applications.
-   Approve recruiters.
-   Generate reports.
-   Manage system settings.

## Student Workflow

The proposed Student application lifecycle is:

1.  Student registers or logs in.
2.  Student completes their profile and uploads a resume.
3.  Student browses or searches internship opportunities.
4.  The interface can present skill-based matches, match percentages,
    and missing skills.
5.  Student selects an internship and submits an application.
6.  Student tracks the application while it is under review.
7.  The application may be rejected or the student may be shortlisted.
8.  If shortlisted, an interview is scheduled and the student can view
    the schedule.
9.  The process ends with a final outcome, such as selected or rejected.

Notes and reminders support the workflow but do not need to be separate
application lifecycle states.

## UML and System Design

The project documentation may include the following diagrams:

-   **Use Case Diagram:** describes the responsibilities of Student,
    Admin, Career Advisor, and Recruiter.
-   **Class Diagram:** represents the main classes and relationships
    needed for the Student workflow.
-   **Student State Diagram:** shows the lifecycle from registration and
    internship selection through application review, interview, and
    final outcome.
-   **Student Sequence Diagram:** illustrates interactions during a
    selected Student workflow.

### Important modeling decisions

-   Students browse and apply for internships; they do not post or
    manage internship listings.
-   Recruiters post and manage their internship listings and handle
    candidate applications.
-   The Student-focused Class Diagram should remain compact and include
    the core classes: Student, Internship, Resume, Application, and
    Interview, with relationships corrected as needed.
-   Skill matching and reminders are new features and should be
    represented consistently in the relevant diagrams.
-   UML relationships and state transitions should follow standard UML
    notation.

## Technology and Tools

The project is currently centered on design and documentation. Tools
used or considered include:

-   **Figma** --- UI/UX design and interactive prototype.
-   **Draw.io / EdrawMax** --- UML and system diagrams.
-   **Microsoft Word / Google Docs** --- proposal and project
    documentation.
-   **GitHub** --- source control and project documentation.

Update this section to reflect the exact tools and versions actually
used by the team.

## Project Scope

The current project scope focuses on:

-   UI/UX design and prototyping.
-   Role-specific user journeys and screens.
-   UML diagrams and system analysis.
-   Demonstrating the intended behavior of the proposed features through
    the prototype.

Unless implemented separately, the following are **not claimed as
completed functionality**:

-   Production backend and API.
-   Live database integration.
-   Real authentication or email/OTP delivery.
-   Automated real-time notifications.
-   A production-grade matching algorithm.
-   Production deployment.

The skill-matching percentage and missing-skill display should be
described as proposed or prototype behavior unless actual matching logic
has been implemented.

## Novelty and Expected Benefits

The project brings internship discovery, application tracking, resume
management, interview schedules, and career support together in a single
student-centered design. Its two highlighted additions are:

1.  **Skill-Based Internship Matching:** helps students understand how
    their skills relate to internship requirements and identify skills
    they may need to develop.
2.  **Smart Deadline & Follow-up Reminders:** helps students remember
    application deadlines, interviews, and follow-up tasks.

The project aims to improve organization, visibility, and usability
rather than claim that every individual feature is a new technology.

## Limitations

-   The current scope is a UI/UX prototype and system-design project.
-   Prototype screens do not by themselves prove that backend operations
    or notifications work.
-   Matching results should not be presented as real algorithmic results
    unless the matching logic has been implemented and tested.
-   Final features and implementation status should be confirmed with
    the project team.

## Future Improvements

Possible future work includes:

-   Implementing a backend API and database.
-   Adding secure authentication and role-based authorization.
-   Implementing real email or in-app notifications.
-   Building and evaluating the skill-matching algorithm.
-   Adding automated tests, accessibility checks, and deployment.
-   Collecting user feedback and improving the interface.

## Repository Structure

A suggested repository structure is:

``` text
internship-tracker/
├── README.md
├── diagrams/
│   ├── use-case-diagram.png
│   ├── class-diagram.png
│   ├── student-state-diagram.png
│   └── student-sequence-diagram.png
├── design/
│   └── figma-link.md
└── documentation/
    ├── project-proposal.md
    └── requirements.md
```

This is a suggested structure, not a claim that these files already
exist. Add the actual diagrams, Figma link, and documentation files as
they become available.

------------------------------------------------------------------------

## Project Summary

**Internship Tracker** is a role-based internship management UI/UX and
system-design project for Students, Recruiters, Career Advisors, and
Admins. It focuses on organizing internship discovery and applications,
with additional student features for skill-based matching and
deadline/follow-up reminders.
