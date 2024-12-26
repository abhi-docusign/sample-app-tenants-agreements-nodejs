# Tenants Agreements Sample App | Complete Integration Guide

## Introduction

This is a sample app for setting up the complete integration guide.

Tenants Agreement demonstrates the following:

1. Authentication with Docusign via [JSON Web Token (JWT) Grant](https://developers.docusign.com/platform/auth/jwt/).
2. **Sent Agreement for Sigining:** The can send an agreement for signing by mentioning the contact information and placing Docusign Tabs on the agreement. You can also check the status of the agreement using check status page.
Features in this use case:
   - Sender View
   - Remote signing
   - Webhooks

## Configuring your integration

Before you can run this sample app on your local machine, you must first create a new integration with a Docusign developer account.

### Create a new integration

1. If you don't already have one, create a [free developer account](https://go.docusign.com/sandbox/productshot/?elqCampaignId=16535).
2. Log into your developer account, and navigate to [My Apps & Keys](https://admindemo.docusign.com/authenticate?goTo=apiIntegratorKey).
3. Select **Add App and Integration Key**.
4. Create a new integration that is configured to use **JSON Web Token (JWT) Grant**.
   You will need the **integration key** itself and its **RSA key pair**. To use this application, you must add your application's **Redirect URI** to your integration key. See our video, [**Creating an Integration Key for JWT Authentication**](https://www.youtube.com/watch?v=GgDqa7-L0yo) for a demonstration of how to create an integration key (client ID) for a user application like this example.
   - Save the **integration key** and **private RSA key pair** somewhere safe as you will need these later.
5. Add the following as redirect URIs for your app:
   - http://localhost:3000
   - http://localhost:3000/index

## Installation guide

### Prerequisites

- A free Docusign developer account.
- Integration key and corresponding RSA key pair from the integration you created above.
- [Node.js](https://nodejs.org/) v14+

### Install dependencies locally

1. Download or clone this repository to your workstation in a new folder named **sample-app-tenants-agreements-nodejs**.
2. Navigate to that folder: **`cd sample-app-tenants-agreements-nodejs`**
3. Navigate to the **client** folder: **`cd client`**
4. Install dependencies using the [npm](https://www.npmjs.com/) package manager: **`npm install`**
5. Navigate to the **server** folder: **`cd ../server`**
6. Install dependencies: **`npm install`**
7. Rename the **.env_example** file in the root directory to **.env**, and update the file with the integration key and other settings.
   > **Note:** Protect your integration key and client secret. You should make sure that the **.env** file will not be stored in your source code repository.
8. Rename the **example_private.key** file to **private.key**, and paste your complete private RSA key into this file (including the header and footer of the key).

## Running the Sample App

1. Navigate to the application folder: **`cd sample-app-tenants-agreements-nodejs`**
2. Navigate to the server folder: **`cd server`**
3. To start the server and client at the same time: **`npm run dev`**
4. **Or,** to run the server and client separately:
   - In one terminal, navigate to the server folder (**`cd server`**) and run **`npm run server`**
   - In a separate terminal, navigate to the client folder (**`cd client`**) and run **`npm start`**
5. Open a browser to **http://localhost:3000**

## License information
This repository uses the MIT License. See the [LICENSE](./LICENSE) file for more information.
