# Roman Numeral Converter App

A web application for converting numbers between 1 and 3999 into Roman numerals. 
Built with Next.js, featuring dark mode support and comprehensive error validation.

## ✨ Features

- Convert any number between 1 and 3999 into Roman numerals
- Real-time error validation and feedback
- Dark mode support for enhanced accessibility
- Responsive design for devices

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Adobe React Spectrum
- **Backend**: Next.js API routes
- **Deployment**: Docker support

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker (optional, for containerization)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/kushagra7/roman-numeral-challenge.git
cd roman-numeral-challenge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Docker Deployment

1. Build the image:
```bash
docker build -t roman-numeral-conversion-app .
```

2. Run the container:
```bash
docker run -p 3000:3000 roman-numeral-conversion-app
```

## 📦 Deployment Options

### AWS Deployment

1. Push Docker image to AWS ECR
2. Deploy using ECS with Fargate or Elastic Beanstalk
3. Configure Application Load Balancer for public access

## 📁 Project Structure

```
roman-numeral-converter/
├── src/
│   ├── app/
│   │   ├── api/            # Backend API Directory
│   │   ├── layout.js       
│   │   ├── page.js         # Home Page
│   │   └── tests/          # Units Test Directory
│   ├── components/
│   │   └── ui/             # UI components
├── public/                 # Static assets
├── .babelrc               
├── Dockerfile              
├── package.json            
└── README.md              
```

## 🔄 API Reference

### Convert to Roman Numeral

```bash
GET /api/romannumeral?query={integer}
```

#### Parameters
- `query`: Integer between 1 and 3999

#### Success Response
```json
{
  "input": "1146",
  "output": "MCXLVI"
}
```

#### Error Response
```
"Invalid input. Please enter an integer between 1 and 3999."
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
