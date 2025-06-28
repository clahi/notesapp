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

## Setting up Amplify Storage
### Create a storage folder

On your local machine, navigate to the notesapp/amplify folder, and create a new folder named storage, and then create a file named resource.ts inside of the new storage folder.

# Deploy Amplify Cloud Sandbox
1. Import backend definitions
On the local machine, navigate to the amplify/backend.ts file, which imports both data and auth. Add the importation of stroge

2. Start sandbox environment
To start your own personal cloud sandbox environment that provides an isolated development space, in a new terminal window, run the following command in your apps root folder:

use `npx ampx sandbox` to start a sandbox environment

 - The sandbox allows you to rapidly build, test, and iterate on a fullstack app. Each developer on your team can use their own disposable sandbox environment connected to cloud resources.


 # Building the Frontend

 Using Amplify UI component library to scaffold out an entire user authentication flow, allowing users to sign up, sign in, and reset their password with just few lines of code. Additionally, you will build an app frontend that allows users to create, update, and delete their notes. They will also be able to upload an image and associate it with a note.

 ## Steps to follow
  - Install Amplify libraries
  - Configure your React app to include authentication, data, and storage for the Notes feature

### Installing the Amplify libraries

We will need two Amplify libraries for your project. The main aws-amplify library contains all of the client-side APIs for connecting your app's frontend to your backend and the @aws-amplify/ui-react library contains framework-specific UI components.

Use `npm install aws-amplify @aws-amplify/ui-react` to install the libraries.