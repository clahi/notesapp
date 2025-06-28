# Notesapp
Full Stack React Application

# Overview
In this project, we will deploy and host a full stack React application using AWS Amplify. AWS Amplify offers a Git-based CI/CD workflow for building, deploying, and hosting single-page web applications or static sites with serverless backends. When connected to a Git repository, Amplify determines the build settings for both the frontend framework and any configured serverless backend resources, and automatically deploys updates with every code commit.

# Initializing a local Amplify App
### Overview
AWS Amplify Gen 2 uses a fullstack TypeScript developer experience (DX) for defining backends. Amplify offers a unified developer experience with hosting, backend, and UI-building capabilities and a code-first approach. 

## What we will accomplish
 - Set up Amplify Auth
 - Set up Amplify Data
 - Set up Amplify Storage

## Setting auth resource
keep the default auth set up as is in notesapp/amplify/auth/resource.ts

## Setting up Amplify Data

### Update authrorization rule
On the local machine, navigate to the notesapp/amplify/data/resource.ts file and update it.

- The following updated code uses a per-owner authorization rule allow.owner() to restrict the note record’s access to the owner of the record. 

- Amplify will automatically add an owner: a.string() field to each note which contains the note owner's identity information upon record creation.