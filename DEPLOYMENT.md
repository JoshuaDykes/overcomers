# Deployment Guide

This guide will help you deploy the Overcomers Caring Ministries website to GitHub Pages.

## Prerequisites

1. Install [Git](https://git-scm.com/downloads) if you haven't already
2. Install [Node.js](https://nodejs.org/) (LTS version recommended)
3. Create a [GitHub account](https://github.com/signup) if you don't have one

## Steps to Deploy

1. **Initialize the Local Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Basic website structure with modern design"
   ```

2. **Create a New Repository on GitHub**
   - Go to [GitHub](https://github.com)
   - Click the "+" button in the top right and select "New repository"
   - Name it `overcomers-caring-ministries`
   - Keep it public
   - Don't initialize with any files
   - Click "Create repository"

3. **Link Local Repository to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/overcomers-caring-ministries.git
   git branch -M main
   git push -u origin main
   ```

4. **Install Dependencies and Build**
   ```bash
   npm install
   npm run build
   ```

5. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings"
   - Scroll down to "GitHub Pages" section
   - Under "Source", select "main" branch
   - Click "Save"

Your website will be available at `https://YOUR_USERNAME.github.io/overcomers-caring-ministries/`

## Updating the Website

1. Make your changes to the files
2. Build the CSS:
   ```bash
   npm run build
   ```
3. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push
   ```

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. Check if the build process works:
   ```bash
   npm run build
   ```

3. Verify your Git configuration:
   ```bash
   git config --list
   ```

4. Check GitHub Pages settings in your repository's settings page

## Additional Notes

- The website uses EmailJS for the contact form. You'll need to:
  1. Sign up at [EmailJS](https://www.emailjs.com/)
  2. Create a new email service
  3. Create an email template
  4. Update the EmailJS configuration in `js/main.js` with your service ID and template ID

- Images and videos are stored locally in the `images` folder
- The website is fully responsive and works on all devices
- Custom CSS is compiled using Tailwind CSS 