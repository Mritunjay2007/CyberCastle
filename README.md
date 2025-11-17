# 🚀 Getting Started with Cyber Castle Website

This guide provides the step-by-step instructions for running the **Cyber Castle Website** on your local machine. This project requires running both the **backend** and the **frontend** simultaneously.

---

### 💻 Step-by-Step Launch Guide

Follow these steps precisely to successfully launch the website:

#### 1. Open Two Terminal Windows

Open **two separate terminal windows** on your computer.

#### 2. Navigate to Project Directories

In the **first terminal window**, navigate to the **backend directory** of the project:

Type: cd path/to/backend
(ACTION: Replace 'path/to/backend' with the actual directory path)

In the **second terminal window**, navigate to the **frontend directory** of the project:

Type: cd path/to/frontend
(ACTION: Replace 'path/to/frontend' with the actual directory path)

#### 3. Start the Backend Server (First Terminal)

In the **first terminal** (backend directory), run the following command **first** to start the server:

Type: npm run dev

> **IMPORTANT:** Ensure the backend server has successfully started before moving to the next step.

#### 4. Start the Frontend Application (Second Terminal)

Switch to the **second terminal** (frontend directory) and run the following command:

Type: npm run dev

#### 5. Launch the Website in Your Browser

The frontend terminal will display a local address (the development link).

* **Copy the HTTPS link** that appears in the **frontend terminal window**.
* **Paste this HTTPS link** into your web browser's address bar.

The **Cyber Castle Website** should now be running locally!

---

### Troubleshooting Notes

* **"npm: command not found"**: Ensure you have **Node.js** and **npm** installed.
* **Module Not Found**: Run `npm install` in both the `backend` and `frontend` directories.
* **Connection Issues**: Verify that you ran the **backend** server *before* starting the **frontend** application.
