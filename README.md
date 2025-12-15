# 🤖 n8n AI Automation Builder

Build powerful n8n automations using natural language prompts. This app uses AI to automatically generate n8n workflows, find API keys, and create automations for images, videos, and more.

## ✨ Features

- **Natural Language Processing**: Describe your automation in plain English
- **Automatic Workflow Generation**: AI creates complete n8n workflows
- **Smart API Key Management**: Automatically finds and configures credentials
- **Multi-Media Support**: Generate images, videos, and other content
- **One-Click Deployment**: Deploy workflows directly to your n8n instance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- n8n instance (cloud or self-hosted)
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/li2ily9gu6p0ta2/n8n-ai-automation-builder.git
cd n8n-ai-automation-builder
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
- `OPENAI_API_KEY`: Your OpenAI API key
- `N8N_API_URL`: Your n8n instance URL
- `N8N_API_KEY`: Your n8n API key

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📖 Usage Examples

### Example 1: Daily Social Media Automation
```
Every day at 9 AM, fetch trending topics from Twitter, 
generate an AI image for each topic, and post to Instagram
```

### Example 2: Content Creation Pipeline
```
When a new blog post is published, generate a summary, 
create a featured image using AI, and send to Slack
```

### Example 3: Video Generation
```
Every Monday, create a motivational video with AI-generated 
visuals and voiceover, then upload to YouTube
```

## 🏗️ Architecture

```
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   API Routes    │
│  (Workflow Gen) │
└────────┬────────┘
         │
         ├──────────┐
         ▼          ▼
┌──────────┐  ┌──────────┐
│ OpenAI   │  │   n8n    │
│   API    │  │   API    │
└──────────┘  └──────────┘
```

## 🔧 Configuration

### n8n Setup

1. Get your n8n API key from your instance settings
2. Enable API access in n8n settings
3. Add the API URL and key to `.env`

### Supported Integrations

The app can automatically configure workflows for:
- Image generation (DALL-E, Stable Diffusion)
- Video generation (various AI models)
- Social media (Twitter, Instagram, LinkedIn)
- Communication (Slack, Discord, Email)
- Data sources (APIs, databases, webhooks)

## 🎯 Roadmap

- [ ] Visual workflow editor
- [ ] Workflow templates library
- [ ] Multi-user support
- [ ] Workflow versioning
- [ ] Advanced scheduling options
- [ ] Custom node creation
- [ ] Workflow marketplace

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [n8n](https://n8n.io/)
- AI by [OpenAI](https://openai.com/)

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ by the Bhindi team
