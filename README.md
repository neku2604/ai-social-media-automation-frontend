# 🚀 AI Social Media Automation Dashboard

> **An AI-assisted, human-in-the-loop system for automating social media content creation, branding, and publishing — designed with real business workflows in mind.**

---

## 🌟 Project Overview

The **AI Social Media Automation Dashboard** is a modern frontend application that demonstrates how **AI creativity**, **human decision-making**, and **automation tools** can work together to streamline recurring social media content workflows.

Instead of blindly automating everything, this project follows a **business-safe, human-in-the-loop approach** to ensure:

- ✅ Brand consistency  
- ✅ Visual quality  
- ✅ Professional accuracy  

This project is built as a **realistic demo** suitable for internship providers, startups, and automation-based products.

---

## 🧠 Problem Statement

Creating social media content consistently is:

- ⏱️ Time-consuming  
- ❌ Error-prone when AI generates text directly  
- 🎨 Difficult to keep visuals consistent  

### 💡 Solution

The workflow is divided into **clear, controlled stages**:

- AI for creativity  
- Humans for approval  
- Canva for branding  
- Zapier for automation  

---

## 🏗️ High-Level Architecture

```text
Business Configuration
        ↓
AI Prompt Generation
        ↓
AI Image Creation (Text-Free)
        ↓
Human Review & Selection
        ↓
Canva Branding
        ↓
Final Approval
        ↓
Zapier Automation
        ↓
Google Drive / Instagram
```

---



## 🧩 Workflow Breakdown

### 🟢 Step 1: Business Configuration

Users configure the campaign by providing:

- 📌 **Content category** (Web Development, Java, AI, etc.)
- 📅 **Posting frequency** (Weekly / Monthly)
- 🖼️ **Number of images**
- 🎨 **Style instructions**

These inputs dynamically shape the AI prompt and ensure the generated visuals align with business intent.

---

### 🟡 Step 2: AI Base Image Generation (Text-Free)

- A predefined **AI prompt template** is used  
- Business inputs dynamically modify the prompt  
- Images are generated **without any visible text**

#### 📌 Why no text?
- Avoid spelling mistakes  
- Maintain brand fonts  
- Ensure professional-quality output  

Images are generated using **Microsoft Bing Image Creator**  
*(Manual step included intentionally for demo and business safety purposes.)*

---

### 🔵 Step 3: Human-in-the-Loop Review

Users can:

- 👀 Preview generated images  
- ✅ Select preferred images  
- 🔄 Regenerate images if required  

This step ensures **quality control**, **visual consistency**, and **brand alignment**.

---

### 🎨 Step 4: Canva Branding & Customization

Approved images are:

- Opened directly in the **Canva Editor**
- Branded with:
  - Internship title  
  - Company logo  
  - Call-to-action  
  - Brand fonts & colors  

🎯 Canva is intentionally used to ensure **perfect typography** and **brand consistency**.

---

### 📤 Step 5: Final Image Upload & Automation

- User uploads the final branded image  
- Frontend sends it to **Zapier via Webhook**

Zapier workflow then:
- ☁️ Uploads the image to **Google Drive**
- 📸 Publishes content to **Instagram / LinkedIn**

---

## 🔧 Tech Stack

### 🖥️ Frontend
- ⚛️ **React**
- ⚡ **Vite**
- 🎨 **Tailwind CSS**
- 🧩 **Lucide Icons**

---

## 🔗 Integrations

- 🖼️ **Microsoft Bing Image Creator**
- 🎨 **Canva**
- ⚡ **Zapier**
- ☁️ **Google Drive**
- 📸 **Instagram for Business**

---

## 👩‍💻 Author

**Neha Kumari**  


